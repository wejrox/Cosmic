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
/* Job advancement NPC
    @author wejrox
*/
// cm is the NPCConversationManager or NPCMoreTalkHandler in use by the client for registering updates.

var status = -1;
var selectedJobId;
var selectedJob;

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
            cm.sendNext("Talk to me when you want to do a #bjob advancement#k.");
            break;
        case 1:
            var level = cm.getChar().getLevel();
            var currentJob = cm.getChar().getJob();

            if (currentJob.getStarterClass() === Packages.client.Job.NOBLESSE) {
                // TODO: Cygnus 4th job doesn't exist, why is it available?
//                if (level >= 100) {
//                    level100CygnusAdvancement(currentJob);
//                } else
                if (level >= 60) {
                    level60CygnusAdvancement(currentJob);
                } else if (level >= 30) {
                    level30CygnusAdvancement(currentJob);
                } else if (level >= 10) {
                    level10CygnusAdvancement(currentJob);
                } else {
                    cm.sendOk("You can't #bjob advance#k until level 10.");
                    cm.dispose();
                    break;
                }
            } else {
                // Need to do highest to lowest for the if statement to work.
                if (level >= 120) {
                    level120Advancement(currentJob);
                    break;
                } else if (level >= 70) {
                    level70Advancement(currentJob);
                    break;
                } else if (level >= 30) {
                    level30Advancement(currentJob);
                    break;
                } else if (level >= 10) {
                    level10Advancement(currentJob);
                    break;
                } else if (level >= 8) {
                    if (currentJob === Packages.client.Job.BEGINNER) {
                        cm.sendSimple(genJobSelection([Packages.client.Job.MAGICIAN]));
                        break;
                    }
                } else {
                    cm.sendOk("You can't #bjob advance#k until level 8.");
                    cm.dispose();
                    break;
                }
            }
            break;
        case 2:
            selectedJobId = selection;
            selectedJob = Packages.client.Job.getById(selectedJobId);
            if (selectedJob != null) {
                cm.sendYesNo("Are you sure you want to job advance into a(n) " + cm.getJobName(selectedJobId) + "?\r\nAny #bremaining SP#k from your previous job #bwill be lost#k!");
                break;
            }

            cm.sendOk("Selected job with id #b" + selectedJobId + "#k doesn't exist, can't advance. Please let us know what happened!");
            cm.dispose();
            break;
        case 3:
            if (type !== 1) {
                cm.dispose();
                break;
            }

            // Set the new job. This gives sp for the new job, so it needs to be done after the old sp is cleared.
            cm.changeJobById(selectedJobId);

            switch (selectedJob) {
                case Packages.client.Job.ARAN1:
                    cm.teachSkill(Packages.constants.skills.Aran.POLEARM_BOOSTER, 0, 20, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.COMBO_ABILITY, 0, 10, -1);
                    break;
                case Packages.client.Job.ARAN2:
                    cm.teachSkill(Packages.constants.skills.Aran.POLEARM_MASTERY, 0, 20, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.FINAL_CHARGE, 0, 30, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.COMBO_DRAIN, 0, 20, -1);
                    cm.teachSkill(Packages.constants.skills.Aran.COMBO_SMASH, 0, 20, -1);
                    break;
                case Packages.client.Job.ARAN3:
                    cm.teachSkill(Packages.constants.skills.Aran.FULL_SWING, 0, 20, -1);
                    break;
                case Packages.client.Job.ARAN4:
                    break;
                default:
                    break;
            }

            cm.sendOk("Your #bnew job#k has been applied! Have fun being a(n) #b" + cm.getJobName(selectedJobId) + "#k!");
            cm.dispose();
            break;
        default:
            cm.dispose();
            break;
    }
}

/**
 * Formats the selections provided into a list to be displayed in the conversation window.
 *
 * @param {int[]} jobOptions A list of options that can be selected.
 * @returns {string} the options for the player to choose from.
 */
function genJobSelection(jobOptions) {
    var menu = "Which job would you like to become? \r\n";
    jobOptions.forEach(function(option) {
        var id = option.getId();
        var name = cm.getJobName(id);
        menu += "#L" + id + "#" + name + "#l \r\n";
    });
    return menu;
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level120Advancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.CRUSADER:
            cm.sendSimple(genJobSelection([Packages.client.Job.HERO]));
            break;
        case Packages.client.Job.WHITEKNIGHT:
            cm.sendSimple(genJobSelection([Packages.client.Job.PALADIN]));
            break;
        case Packages.client.Job.DRAGONKNIGHT:
            cm.sendSimple(genJobSelection([Packages.client.Job.DARKKNIGHT]));
            break;
        case Packages.client.Job.FP_MAGE:
            cm.sendSimple(genJobSelection([Packages.client.Job.FP_ARCHMAGE]));
            break;
        case Packages.client.Job.IL_MAGE:
            cm.sendSimple(genJobSelection([Packages.client.Job.IL_ARCHMAGE]));
            break;
        case Packages.client.Job.PRIEST:
            cm.sendSimple(genJobSelection([Packages.client.Job.BISHOP]));
            break;
        case Packages.client.Job.RANGER:
            cm.sendSimple(genJobSelection([Packages.client.Job.BOWMASTER]));
            break;
        case Packages.client.Job.SNIPER:
            cm.sendSimple(genJobSelection([Packages.client.Job.MARKSMAN]));
            break;
        case Packages.client.Job.HERMIT:
            cm.sendSimple(genJobSelection([Packages.client.Job.NIGHTLORD]));
            break;
        case Packages.client.Job.CHIEFBANDIT:
            cm.sendSimple(genJobSelection([Packages.client.Job.SHADOWER]));
            break;
        case Packages.client.Job.MARAUDER:
            cm.sendSimple(genJobSelection([Packages.client.Job.BUCCANEER]));
            break;
        case Packages.client.Job.OUTLAW:
            cm.sendSimple(genJobSelection([Packages.client.Job.CORSAIR]));
            break;
        case Packages.client.Job.ARAN3:
            cm.sendSimple(genJobSelection([Packages.client.Job.ARAN4]));
            break;
        default:
            level70Advancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level100CygnusAdvancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.DAWNWARRIOR3:
            cm.sendSimple(genJobSelection([Packages.client.Job.DAWNWARRIOR4]));
            break;
        case Packages.client.Job.BLAZEWIZARD3:
            cm.sendSimple(genJobSelection([Packages.client.Job.BLAZEWIZARD4]));
            break;
        case Packages.client.Job.WINDARCHER3:
            cm.sendSimple(genJobSelection([Packages.client.Job.WINDARCHER4]));
            break;
        case Packages.client.Job.NIGHTWALKER3:
            cm.sendSimple(genJobSelection([Packages.client.Job.NIGHTWALKER4]));
            break;
        case Packages.client.Job.THUNDERBREAKER3:
            cm.sendSimple(genJobSelection([Packages.client.Job.THUNDERBREAKER4]));
            break;
        default:
            level60CygnusAdvancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level70Advancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.FIGHTER:
            cm.sendSimple(genJobSelection([Packages.client.Job.CRUSADER]));
            break;
        case Packages.client.Job.PAGE:
            cm.sendSimple(genJobSelection([Packages.client.Job.WHITEKNIGHT]));
            break;
        case Packages.client.Job.SPEARMAN:
            cm.sendSimple(genJobSelection([Packages.client.Job.DRAGONKNIGHT]));
            break;
        case Packages.client.Job.FP_WIZARD:
            cm.sendSimple(genJobSelection([Packages.client.Job.FP_MAGE]));
            break;
        case Packages.client.Job.IL_WIZARD:
            cm.sendSimple(genJobSelection([Packages.client.Job.IL_MAGE]));
            break;
        case Packages.client.Job.CLERIC:
            cm.sendSimple(genJobSelection([Packages.client.Job.PRIEST]));
            break;
        case Packages.client.Job.HUNTER:
            cm.sendSimple(genJobSelection([Packages.client.Job.RANGER]));
            break;
        case Packages.client.Job.CROSSBOWMAN:
            cm.sendSimple(genJobSelection([Packages.client.Job.SNIPER]));
            break;
        case Packages.client.Job.ASSASSIN:
            cm.sendSimple(genJobSelection([Packages.client.Job.HERMIT]));
            break;
        case Packages.client.Job.BANDIT:
            cm.sendSimple(genJobSelection([Packages.client.Job.CHIEFBANDIT]));
            break;
        case Packages.client.Job.BRAWLER:
            cm.sendSimple(genJobSelection([Packages.client.Job.MARAUDER]));
            break;
        case Packages.client.Job.GUNSLINGER:
            cm.sendSimple(genJobSelection([Packages.client.Job.OUTLAW]));
            break;
        case Packages.client.Job.ARAN2:
            cm.sendSimple(genJobSelection([Packages.client.Job.ARAN3]));
            break;
        default:
            level30Advancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level60CygnusAdvancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.DAWNWARRIOR2:
            cm.sendSimple(genJobSelection([Packages.client.Job.DAWNWARRIOR3]));
            break;
        case Packages.client.Job.BLAZEWIZARD2:
            cm.sendSimple(genJobSelection([Packages.client.Job.BLAZEWIZARD3]));
            break;
        case Packages.client.Job.WINDARCHER2:
            cm.sendSimple(genJobSelection([Packages.client.Job.WINDARCHER3]));
            break;
        case Packages.client.Job.NIGHTWALKER2:
            cm.sendSimple(genJobSelection([Packages.client.Job.NIGHTWALKER3]));
            break;
        case Packages.client.Job.THUNDERBREAKER2:
            cm.sendSimple(genJobSelection([Packages.client.Job.THUNDERBREAKER3]));
            break;
        default:
            level30CygnusAdvancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level30Advancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.WARRIOR:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.FIGHTER,
                Packages.client.Job.PAGE,
                Packages.client.Job.SPEARMAN,
            ]));
            break;
        case Packages.client.Job.MAGICIAN:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.FP_WIZARD,
                Packages.client.Job.IL_WIZARD,
                Packages.client.Job.CLERIC,
            ]));
            break;
        case Packages.client.Job.BOWMAN:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.HUNTER,
                Packages.client.Job.CROSSBOWMAN,
            ]));
            break;
        case Packages.client.Job.THIEF:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.ASSASSIN,
                Packages.client.Job.BANDIT,
            ]));
            break;
        case Packages.client.Job.PIRATE:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.BRAWLER,
                Packages.client.Job.GUNSLINGER,
            ]));
            break;
        case Packages.client.Job.ARAN1:
            cm.sendSimple(genJobSelection([Packages.client.Job.ARAN2]));
            break;
        default:
            level10Advancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level30CygnusAdvancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.DAWNWARRIOR1:
            cm.sendSimple(genJobSelection([Packages.client.Job.DAWNWARRIOR2]));
            break;
        case Packages.client.Job.BLAZEWIZARD1:
            cm.sendSimple(genJobSelection([Packages.client.Job.BLAZEWIZARD2]));
            break;
        case Packages.client.Job.WINDARCHER1:
            cm.sendSimple(genJobSelection([Packages.client.Job.WINDARCHER2]));
            break;
        case Packages.client.Job.NIGHTWALKER1:
            cm.sendSimple(genJobSelection([Packages.client.Job.NIGHTWALKER2]));
            break;
        case Packages.client.Job.THUNDERBREAKER1:
            cm.sendSimple(genJobSelection([Packages.client.Job.THUNDERBREAKER2]));
            break;
        default:
            level10CygnusAdvancement(currentJob);
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level10Advancement(currentJob) {
    switch (currentJob) {
        case Packages.client.Job.BEGINNER:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.WARRIOR,
                Packages.client.Job.MAGICIAN,
                Packages.client.Job.BOWMAN,
                Packages.client.Job.THIEF,
                Packages.client.Job.PIRATE,
            ]));
            break;
        case Packages.client.Job.LEGEND:
            cm.sendSimple(genJobSelection([Packages.client.Job.ARAN1]));
            break;
        default:
            cm.sendOk("You aren't eligible for a #bjob advancement#k right now.\r\n#bExplorer#k and #bAran#k advancement levels: #b10#k, #b30#k, #b70#k, #b120#k.\r\n");
            cm.dispose();
            break;
    }
}

/**
 * @param {int} currentJob Enum representing the current job that the character has.
 */
function level10CygnusAdvancement (currentJob) {
    switch(currentJob) {
        case Packages.client.Job.NOBLESSE:
            cm.sendSimple(genJobSelection([
                Packages.client.Job.DAWNWARRIOR1,
                Packages.client.Job.BLAZEWIZARD1,
                Packages.client.Job.WINDARCHER1,
                Packages.client.Job.NIGHTWALKER1,
                Packages.client.Job.THUNDERBREAKER1,
            ]));
            break;
        default:
            cm.sendOk("You aren't eligible for a #bjob advancement#k right now.\r\n#bCygnus#k advancement levels: #b10#k, #b30#k, #b60#k.\r\n");
            cm.dispose();
            break;
    }
}