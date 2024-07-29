package extensions;

import client.command.Command;
import extensions.commands.FourthJobQuestSkillsCommand;
import extensions.commands.JobAdvancementCommand;
import extensions.commands.RebirthCommand;
import extensions.commands.ShopCommand;
import client.command.commands.gm1.GotoCommand;

import java.util.Map;

import static java.util.Map.entry;

public class CommandsExtension {
    public static Map<String, Class<? extends Command>> lv0Commands = Map.ofEntries(
        entry("jobadvancement", JobAdvancementCommand.class),
        entry("unlockquestskills", FourthJobQuestSkillsCommand.class),
//        entry("shop", ShopCommand.class),
        entry("goto", GotoCommand.class),
        entry("rebirth", RebirthCommand.class)
    );
    public static Map<String, Class<? extends Command>> lv1Commands = Map.ofEntries(
    );
    public static Map<String, Class<? extends Command>> lv2Commands = Map.ofEntries(
    );
    public static Map<String, Class<? extends Command>> lv3Commands = Map.ofEntries(
    );
    public static Map<String, Class<? extends Command>> lv4Commands = Map.ofEntries(
    );
    public static Map<String, Class<? extends Command>> lv5Commands = Map.ofEntries(
    );
    public static Map<String, Class<? extends Command>> lv6Commands = Map.ofEntries(
    );
}
