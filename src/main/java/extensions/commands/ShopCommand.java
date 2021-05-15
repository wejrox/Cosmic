package extensions.commands;

import client.Client;
import client.command.Command;

public class ShopCommand extends Command {
    {
        setDescription("Open a shop that contains some useful items.");
    }

    @Override
    public void execute(Client c, String[] params) {
        c.getAbstractPlayerInteraction().openNpc(9010021);
    }
}
