package extensions.commands;

import client.Character;
import client.Client;
import client.Stat;
import client.command.Command;

public class SetPlayerStat extends Command {
    {
        setDescription("Sets the requested stat on the player to the value provided.");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        if (params.length < 3) {
            player.yellowMessage("Syntax: !setplayerstat <playername> [str, dex, int, luk] <value>");
            return;
        }

        Character target = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
        if (target == null) {
            player.yellowMessage("Error: Targeted player couldn't be found.");
            return;
        }

        StatSelection selection;
        try {
            selection = StatSelection.valueOf(params[1]);
        } catch (IllegalArgumentException e) {
            player.yellowMessage("Error: Stat is not recognised.");
            return;
        }

        int statValue;
        try {
            statValue = Integer.parseInt(params[2]);

            if (statValue > Short.MAX_VALUE) {
                statValue = Short.MAX_VALUE;
            } else if (statValue < 4) {
                statValue = 4;
            }
        } catch (NumberFormatException nfe) {
            player.yellowMessage("Error: Stat value is not a number.");
            return;
        }

        Stat targetStat = Stat.valueOf(selection.name());
        target.updateSingleStat(targetStat, statValue);
    }

    // Limited to the main 4 stats.
    private enum StatSelection {
        STR, DEX, INT, LUK
    }
}