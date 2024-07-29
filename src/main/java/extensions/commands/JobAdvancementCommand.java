package extensions.commands;

import client.Client;
import client.command.Command;

public class JobAdvancementCommand extends Command {
    {
        setDescription("Perform job advancements if you're the right level.");
    }

    @Override
    public void execute(Client c, String[] params) {
            c.getAbstractPlayerInteraction().openNpc(9010000, "jobAdvancement");
    }
}
