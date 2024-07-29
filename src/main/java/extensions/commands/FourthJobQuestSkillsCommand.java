package extensions.commands;

import client.Client;
import client.command.Command;
import extensions.ConfigExtension;

public class FourthJobQuestSkillsCommand extends Command {
    {
        setDescription("Unlock skills for fourth job that usually require quests.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(ConfigExtension.config.custom.REBIRTH_NPC_ID, "fourthJobQuestSkillsGranter");
    }
}
