package extensions.commands;

import client.Client;
import client.command.Command;
import extensions.ConfigExtension;

public class RebirthCommand extends Command {
    {
        setDescription("Rebirth your character if you're level 200.");
    }

    @Override
    public void execute(Client c, String[] params) {
        if (ConfigExtension.config.custom.USE_REBIRTH_SYSTEM) {
            c.getAbstractPlayerInteraction().openNpc(ConfigExtension.config.custom.REBIRTH_NPC_ID, "rebirth");
        } else {
            c.getPlayer().dropMessage("Rebirths are not enabled on this server.");
        }
    }
}
