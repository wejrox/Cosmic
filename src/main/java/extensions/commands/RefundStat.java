package extensions.commands;

import client.Character;
import client.Client;
import client.Stat;
import client.command.Command;

public class RefundStat extends Command {
    {
        setDescription("Refunds all used AP for the requested stat, resetting it back to 4.");
    }

    @Override
    public void execute(Client c, String[] params) {
        Character player = c.getPlayer();
        if (params.length < 1) {
            player.yellowMessage("Syntax: @refundstat [str, dex, int, luk]");
            return;
        }

        Stat targetStat;
        try {
            targetStat = getStat(params[0]);
        } catch (IllegalStateException e) {
            player.yellowMessage("Error: " + e.getMessage());
            return;
        }

        int minStatValue = 4;
        int currentStatValue = getCurrentStatValue(player, targetStat);
        int statRefund = Math.max(0, currentStatValue - minStatValue);

        resetStat(player, targetStat);
        player.changeRemainingAp(player.getRemainingAp() + statRefund, false);
    }

    private void resetStat(Character player, Stat requestedStat) {
        switch (requestedStat) {
            case Stat.STR:
                player.updateStr(4);
                break;
            case Stat.DEX:
                player.updateDex(4);
                break;
            case Stat.INT:
                player.updateInt(4);
                break;
            case Stat.LUK:
                player.updateLuk(4);
                break;
            default:
                throw new IllegalStateException("Unsupported stat requested: " + requestedStat);
        }
    }

    private int getCurrentStatValue(Character player, Stat requestedStat) {
        return switch (requestedStat) {
            case Stat.STR: yield player.getStr();
            case Stat.DEX: yield player.getDex();
            case Stat.INT: yield player.getInt();
            case Stat.LUK: yield player.getLuk();
            default:
                throw new IllegalStateException("Unsupported stat requested: " + requestedStat);
        };
    }

    private Stat getStat(String requestedStat) {
        return switch (requestedStat.toLowerCase()) {
            case "str": yield Stat.STR;
            case "dex": yield Stat.DEX;
            case "int": yield Stat.INT;
            case "luk": yield Stat.LUK;
            default:
                throw new IllegalStateException("Unsupported stat requested: " + requestedStat);
        };
    }
}