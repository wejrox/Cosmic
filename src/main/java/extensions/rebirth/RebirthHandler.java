package extensions.rebirth;

import client.Character;
import client.Job;
import client.QuestStatus;
import extensions.ConfigExtension;
import scripting.npc.NPCScriptManager;
import server.quest.Quest;
import tools.DatabaseConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Map;

public class RebirthHandler {
    private static final String rebirthNpcScriptName = "rebirth";

    private final Boolean isEnabled;
    private final Character character;
    private final int rebirthNpc;

    public RebirthHandler(Character character) {
        this.character = character;
        this.isEnabled = ConfigExtension.config.custom.USE_REBIRTH_SYSTEM;
        this.rebirthNpc = ConfigExtension.config.custom.REBIRTH_NPC_ID;
    }

    public void scriptNpcWhenEnabled(Map<Integer, String> npcsIds) {
        if (isEnabled) {
            npcsIds.put(rebirthNpc, "Rebirth");
        }
    }

    public boolean isRebirthNpc(int requestedNpc) {
        if (!isEnabled) return false;
        return requestedNpc == rebirthNpc;
    }

    public void performRebirthNpcInteraction(int requestedNpc) {
        if (!isEnabled) return;
        if(rebirthNpc != requestedNpc) return;
        NPCScriptManager.getInstance().start(character.getClient(), rebirthNpc, rebirthNpcScriptName, null);
    }

    public void executeRebirthAsId(int jobId) {
        executeRebirthAs(Job.getById(jobId));
    }

    public void executeRebirthAs(Job job) {
        if (!isEnabled) {
            character.yellowMessage("Rebirth system is not enabled!");
            return;
        }
        if (character.getLevel() != character.getMaxClassLevel()) {
            return;
        }

        // Reset all the quest ids so the people can do job advancements again.
        for (int id : RebirthConstants.JOB_ADV_QUEST_IDS) {
            forfeitQuest(id);
        }

        addRebirth();
        character.changeJob(job);
        character.setLevel(0);
        character.levelUp(true);

        // Clear all skill points. This enables rebirths to function correctly when the player has already been this class before.
        // Without clearing SP, they would have lots left over and receive a message to spend it all before continuing.
        character.clearAllSp();
    }

    private void addRebirth() {
        setRebirths(getRebirths() + 1);
    }

    private void setRebirths(int value) {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("UPDATE characters SET rebirths=? WHERE id=?;")) {
            ps.setInt(1, value);
            ps.setInt(2, character.getId());
            ps.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public int getRebirths() {
        try (Connection con = DatabaseConnection.getConnection();
             PreparedStatement ps = con.prepareStatement("SELECT rebirths FROM characters WHERE id=?;")) {
            ps.setInt(1, character.getId());

            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        throw new RuntimeException();
    }

    /**
     * Adds a quest to be forfeited to the delayed quest update list, for processing when ready.
     * This method can also be used to reset completed quests, but each quest in a series must be forfeit individually.
     *
     * @param id ID of the quest that should be forfeit.
     */
    private void forfeitQuest(int id) {
        Quest q = Quest.getInstance(id);
        QuestStatus qs = character.getQuest(q);

        character.announceUpdateQuest(Character.DelayedQuestUpdate.FORFEIT, qs.getQuestID());
    }
}
