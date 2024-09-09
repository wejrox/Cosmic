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
            player.yellowMessage("Syntax: !setplayerstat <playername> [str, dex, int, luk, ap, sp] <value>");
            return;
        }

        Character target = c.getWorldServer().getPlayerStorage().getCharacterByName(params[0]);
        if (target == null) {
            player.yellowMessage("Error: Targeted player couldn't be found.");
            return;
        }

        Stat targetStat;
        try {
            targetStat = getStat(params[1]);
        } catch (IllegalStateException e) {
            player.yellowMessage("Error: " + e.getMessage());
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

        setStat(player, targetStat, statValue);
    }

    private void setStat(Character player, Stat requestedStat, int value) {
        switch (requestedStat) {
            case Stat.STR:
                player.updateStr(value);
                break;
            case Stat.DEX:
                player.updateDex(value);
                break;
            case Stat.INT:
                player.updateInt(value);
                break;
            case Stat.LUK:
                player.updateLuk(value);
                break;
            case Stat.AVAILABLEAP:
                player.changeRemainingAp(value, false);
                break;
            case Stat.AVAILABLESP:
                player.updateRemainingSp(value);
            default:
                throw new IllegalStateException("Unsupported stat requested: " + requestedStat);
        }
    }

    private Stat getStat(String requestedStat) {
        return switch (requestedStat.toLowerCase()) {
            case "str": yield Stat.STR;
            case "dex": yield Stat.DEX;
            case "int": yield Stat.INT;
            case "luk": yield Stat.LUK;
            case "ap": yield Stat.AVAILABLEAP;
            case "sp": yield Stat.AVAILABLESP;
            default:
                throw new IllegalStateException("Unsupported stat requested: " + requestedStat);
        };
    }
}