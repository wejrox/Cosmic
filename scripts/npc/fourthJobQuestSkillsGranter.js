/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* quest based skills granter to remove the requirement to do class quests.
    @author wejrox
*/
// cm is the NPCConversationManager or NPCMoreTalkHandler in use by the client for registering updates.

var status = -1;

/**
 * Executed when the player first opens the npc chat window.
 */
function start() {
    action(1, 0, 0);
}

/**
 * Executed when the player continues onto the next chat window.
 *
 * @param {int} mode 0 = end chat, 1 = follow on.
 * @param {int} type Whether no or yes was selected in the previous window. No = 0, Yes = 1.
 * @param {int} selection Zero based option that was selected from the previous chat window, if any.
 */
function action(mode, type, selection) {
    if (mode !== 1) {
        cm.dispose();
        return;
    }
    status++;

    // Handle each selection through the conversation.
    switch (status) {
        case 0:
            cm.sendNext("Talk to me when you want to unlock #bskills#k for your #bjob#k which are locked behind #bquests#k.");
            break;
        case 1:
            cm.sendYesNo("Would you like to unlock your skills? This cannot be undone!");
            break;
        case 2:
            // Cancel if the user clicked no.
            if (type !== 1) {
                cm.sendOk("Alright, come back if you change you're mind!");
                cm.dispose();
                break;
            }
            switch (cm.getChar().getJob()) {
                case Packages.client.Job.NIGHTWALKER4:
                    cm.teachSkill(Packages.constants.skills.NightLord.TRIPLE_THROW, 0, 20, -1);
                    break;
                case Packages.client.Job.ARAN4:
                    cm.teachSkill(Packages.constants.skills.Aran.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.HIGH_MASTERY, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.FREEZE_STANDING, 0, 10, -1);
                    break;
                case Packages.client.Job.IL_ARCHMAGE:
                    cm.teachSkill(Packages.constants.skills.ILArchMage.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.ILArchMage.BLIZZARD, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.ILArchMage.IFRIT, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.ILArchMage.HEROS_WILL, 0, 5, -1);
                    cm.teachSkill(Packages.constants.skills.ILArchMage.ICE_DEMON, 0, 10, -1);
                    break;
                case Packages.client.Job.NIGHTLORD:
                    cm.teachSkill(Packages.constants.skills.NightLord.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.NightLord.NINJA_STORM, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.NightLord.TAUNT, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.NightLord.NINJA_AMBUSH, 0, 10, -1);
                    break;
                case Packages.client.Job.BISHOP:
                    cm.teachSkill(Packages.constants.skills.Bishop.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bishop.HEROS_WILL, 0, 5, -1);
                    cm.teachSkill(Packages.constants.skills.Bishop.GENESIS, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bishop.BAHAMUT, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bishop.RESURRECTION, 0, 10, -1);
                    break;
                case Packages.client.Job.MARKSMAN:
                    cm.teachSkill(Packages.constants.skills.Marksman.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Marksman.HEROS_WILL, 0, 5, -1);
                    cm.teachSkill(Packages.constants.skills.Marksman.FROST_PREY, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Marksman.PIERCING_ARROW, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Marksman.SNIPE, 0, 10, -1);
                    break;
                case Packages.client.Job.BOWMASTER:
                    cm.teachSkill(Packages.constants.skills.Bowmaster.MAPLE_WARRIOR, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bowmaster.HEROS_WILL, 0, 5, -1);
                    cm.teachSkill(Packages.constants.skills.Bowmaster.CONCENTRATE, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bowmaster.PHOENIX, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bowmaster.HURRICANE, 0, 10, -1);
                    cm.teachSkill(Packages.constants.skills.Bowmaster.DRAGONS_BREATH, 0, 10, -1);
                    break;
                default:
                    cm.sendOk("No skills are available for your class at this time. If this seems wrong, please let us know!");
                    cm.dispose();
                    return;
            }

            cm.sendOk("Skills have been unlocked, have fun!");
            cm.dispose();
            return;
        default:
            cm.dispose();
            break;
    }
}
