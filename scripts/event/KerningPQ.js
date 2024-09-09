/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/**
 * @author: Ronan
 * @event: Kerning PQ
 */

var isPq = true;
var minPlayers = 3, maxPlayers = 4;
var minLevel = 21, maxLevel = 200;
var entryMap = 103000800;
var exitMap = 103000890;
var recruitMap = 103000000;
var clearMap = 103000805;

var minMapId = 103000800;
var maxMapId = 103000805;

var eventTime = 30;     // 30 minutes

const maxLobbies = 1;

function init() {
    setEventRequirements();
}

function getMaxLobbies() {
    return maxLobbies;
}

function setEventRequirements() {
    var reqStr = "";

    reqStr += "\r\n    Number of players: ";
    if (maxPlayers - minPlayers >= 1) {
        reqStr += minPlayers + " ~ " + maxPlayers;
    } else {
        reqStr += minPlayers;
    }

    reqStr += "\r\n    Level range: ";
    if (maxLevel - minLevel >= 1) {
        reqStr += minLevel + " ~ " + maxLevel;
    } else {
        reqStr += minLevel;
    }

    reqStr += "\r\n    Time limit: ";
    reqStr += eventTime + " minutes";

    em.setProperty("party", reqStr);
}

function setEventExclusives(eim) {
    var itemSet = [4001007, 4001008];
    eim.setExclusiveItems(itemSet);
}

function setEventRewards(eim) {
    var singleItems, multipleItems, singleItemQty, multipleItemQty, evLevel, expStages;

    evLevel = 1;    //Rewards at clear PQ
    singleItems = [
        // Armor
        1050100, // Bathrobe for men
        1051098, // Bathrobe for women
        1002026, // Brown Bamboo hat
        1002089, // Green Bamboo hat
        1002090, // Blue bamboo hat
        1002518, // Maple bandana blue
        1002510, // Maple hat [3]
        1102082, // Ragged black cape
        // Weapons
        1452016, // Maple Bow
        1382009, // Maple Staff
        1442053, // Pink Flower Tube (Polearm)
        1092030, // Maple Shield
        1472030, // Maple Claw
        1332025, // Maple Wagner
        1462014, // Maple Crow
        1492020, // Maple Gun
        // Rings
        1112405, // Lilin's Ring
        // Earrings
        1032028, // Red emerald earrings
        // Face
        1012098, // Maple Leaf (str)
        1012101, // Maple Leaf (dex)
        1012102, // Maple Leaf (int)
        1012103, // Maple Leaf (luk)
        // Throwing Knives
        2070003, // Kumbi
        2070004, // Tobi
        // 2070005, // Steely
        // 2070006, // Ilbi
        // 2070016, // Crystal ilbi
        // 2070018, // Balanced fury
        // Forehead
        1022088, // Archeologist glasses
        // Setup
        3010061, // Underneath the Maple Tree (Chair)
    ];
    singleItemQty = singleItems.map(() => 1)

    multipleItems = [
        // Use
        2022117, // Maple syrup
        2340000, // White scroll
        2044503, // GM 100% bow scroll
        2043803, // GM 100% staff scroll
        2044403, // GM 100% polearm scroll
        2044703, // GM 100% claw scroll
        2043303, // GM 100% dagger scroll
        2044603, // GM 100% crossbow scroll
        2040541, // 15% overall str
        2040527, // 15% overall int
        2040523, // 15% overall dex
        2040529, // 15% overall luk
    ];
    multipleItemQty = [
        10,
        50,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
        10,
    ];
    // itemSet = [2040505, 2040514, 2040502, 2040002, 2040602, 2040402, 2040802, 1032009, 1032004, 1032005, 1032006, 1032007, 1032010, 1032002, 1002026, 1002089, 1002090, 2000003, 2000001, 2000002, 2000006, 2022003, 2022000, 2000004, 4003000, 4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008];
    // itemQty = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 80, 80, 80, 50, 5, 15, 15, 30, 15, 15, 15, 15, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 3];
    eim.setEventRewards(evLevel, singleItems.concat(multipleItems), singleItemQty.concat(multipleItemQty));

    expStages = [100, 200, 400, 800, 1500];    //bonus exp given on CLEAR stage signal
    eim.setEventClearStageExp(expStages);
}

function getEligibleParty(party) {      //selects, from the given party, the team that is allowed to attempt this event
    var eligible = [];
    var hasLeader = false;

    if (party.size() > 0) {
        var partyList = party.toArray();

        for (var i = 0; i < party.size(); i++) {
            var ch = partyList[i];

            if (ch.getMapId() == recruitMap && ch.getLevel() >= minLevel && ch.getLevel() <= maxLevel) {
                if (ch.isLeader()) {
                    hasLeader = true;
                }
                eligible.push(ch);
            }
        }
    }

    if (!(hasLeader && eligible.length >= minPlayers && eligible.length <= maxPlayers)) {
        eligible = [];
    }
    return Java.to(eligible, Java.type('net.server.world.PartyCharacter[]'));
}

function setup(level, lobbyid) {
    var eim = em.newInstance("Kerning" + lobbyid);
    eim.setProperty("level", level);

    respawnStages(eim);
    eim.startEventTimer(eventTime * 60000);
    setEventRewards(eim);
    setEventExclusives(eim);
    return eim;
}

function afterSetup(eim) {}

function respawnStages(eim) {
    eim.getMapInstance(103000800).instanceMapRespawn();
    eim.getMapInstance(103000805).instanceMapRespawn();
    eim.schedule("respawnStages", 15 * 1000);
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(entryMap);
    player.changeMap(map, map.getPortal(0));
}

function scheduledTimeout(eim) {
    end(eim);
}

function playerUnregistered(eim, player) {}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);
    player.changeMap(exitMap, 0);
}

function playerLeft(eim, player) {
    if (!eim.isEventCleared()) {
        playerExit(eim, player);
    }
}

function changedMap(eim, player, mapid) {
    if (mapid < minMapId || mapid > maxMapId) {
        if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
            eim.unregisterPlayer(player);
            end(eim);
        } else {
            eim.unregisterPlayer(player);
        }
    }
}

function changedLeader(eim, leader) {
    var mapid = leader.getMapId();
    if (!eim.isEventCleared() && (mapid < minMapId || mapid > maxMapId)) {
        end(eim);
    }
}

function playerDead(eim, player) {}

function playerRevive(eim, player) { // player presses ok on the death pop up.
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}

function playerDisconnected(eim, player) {
    if (eim.isEventTeamLackingNow(true, minPlayers, player)) {
        eim.unregisterPlayer(player);
        end(eim);
    } else {
        eim.unregisterPlayer(player);
    }
}

function leftParty(eim, player) {
    if (eim.isEventTeamLackingNow(false, minPlayers, player)) {
        end(eim);
    } else {
        playerLeft(eim, player);
    }
}

function disbandParty(eim) {
    if (!eim.isEventCleared()) {
        end(eim);
    }
}

function monsterValue(eim, mobId) {
    return 1;
}

function end(eim) {
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
    }
    eim.dispose();
}

function giveRandomEventReward(eim, player) {
    eim.giveEventReward(player);
}

function clearPQ(eim) {
    eim.stopEventTimer();
    eim.setEventCleared();
}

function monsterKilled(mob, eim) {}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function dispose(eim) {}
