USE `cosmic`;

# Shop Id =  9270066;
# Npc Id = 9010021; # Wolf Spirit Ryko

DELETE FROM `shops` WHERE `shopid` = 9270066;
INSERT INTO `shops` (`shopid`,`npcid`) VALUES
# Custom shop, all following ids can be used up to and excluding 9999992.
 (9270066, 9010021);

# Custom NPC for useful levelling items. Clear before inserting for idempotency.
# Increments of 5 in case we want to insert stuff in future without rewriting the positions.
DELETE FROM `shopitems` WHERE `shopid` = 9270066;
INSERT INTO `shopitems` (`shopid`, `itemid`, `price`, `pitch`, `position`) VALUES
 (9270066, 1002083, 50000, 0, 5), # Black bandana.
 (9270066, 1002026, 50000, 0, 10), # Brown Bamboo hat.
 (9270066, 1002357, 5000000, 0, 15), # Zakum Helmet 1.
 (9270066, 1022089, 100000, 0, 20), # Archaologists glasses.
 (9270066, 1012098, 100000, 0, 25), # Maple leaf str.
 (9270066, 1012101, 100000, 0, 30), # Maple leaf dex.
 (9270066, 1012102, 100000, 0, 35), # Maple leaf int.
 (9270066, 1012103, 100000, 0, 40), # Maple leaf luk.
 (9270066, 1132004, 100000, 0, 41), # Black belt.
 (9270066, 1112414, 100000, 0, 42), # Lilin's ring.
 (9270066, 1122000, 5000000, 0, 43), # Horntail necklace.
 (9270066, 2041200, 1000000, 0, 44), # Dragon Stone.

 (9270066, 1050018, 500000, 0, 45), # Blue sauna robe.
 (9270066, 1051017, 500000, 0, 50), # Red sauna robe.
 (9270066, 1050100, 250000, 0, 55), # Bathrobe for men. lvl 20 req.
 (9270066, 1051098, 250000, 0, 60), # Bathrobe for women. lvl 20 req.

 (9270066, 1082145, 400000, 0, 65), # Yellow work gloves.
 (9270066, 1082149, 500000, 0, 70), # Brown work gloves. 2 extra slots.
 (9270066, 1082223, 500000, 0, 75), # Stormcaster gloves. extra att.

 (9270066, 1072169, 500000, 0, 80), # Blue snow shoes.
 (9270066, 1032048, 500000, 0, 85), # Crystal leaf earrings.
 (9270066, 1102205, 500000, 0, 90), # Crimsonheart cloak.

 (9270066, 2070016, 1000000, 0, 100), # Crystal Ilbis.
 (9270066, 2070005, 100000, 0, 105), # Steely throwing-knives.
 (9270066, 1472073, 10000000, 0, 110), # Night raven's claw.
 (9270066, 1472055, 1000000, 0, 115), # Maple skanda.
 (9270066, 1472032, 500000, 0, 120), # Maple kandayo.
 (9270066, 1472030, 250000, 0, 125), # Maple claw.
 (9270066, 1382039, 1000000, 0, 130), # Maple wisdom staff.
 (9270066, 1372041, 5000000, 0, 135), # Elemental wand 7.
 (9270066, 1092045, 5000000, 0, 140), # Maple magician shield.
 (9270066, 1102041, 500000, 0, 145), # Pink Adventurer cape.
 (9270066, 1102082, 100000, 0, 150), # Ragged black cape.
 (9270066, 1072171, 500000, 0, 155), # Black snow shoes.
 (9270066, 1122014, 500000, 0, 160), # Silver deputy star.

 (9270066, 1442051, 1000000, 0, 161), # Maple Karstan.
 (9270066, 1442024, 500000, 0, 162), # Maple Scorpio.
 (9270066, 1442015, 250000, 0, 163), # Golden snowboard.
 (9270066, 1050083, 1000000, 0, 164), # Dark battle road.
 (9270066, 1072344, 500000, 0, 165); # Facestompers.

INSERT INTO `shopitems` (`shopid`, `itemid`, `price`, `pitch`, `position`) VALUES
 (9270066, 2044502, 50000, 0, 175), # Scroll bow watt 10%.
 (9270066, 2044402, 50000, 0, 176), # Scroll for Pole Arm for ATT 10%
 (9270066, 2040806, 50000, 0, 180), # Scroll gloves dex 10%.
 (9270066, 2040502, 50000, 0, 181), # Scroll overall dex 10%.
 (9270066, 2040031, 50000, 0, 182), # Scroll helmet dex 10%.
 (9270066, 2040702, 50000, 0, 183), # Scroll shoes dex 10%.
 (9270066, 2041020, 50000, 0, 184), # Scroll cape dex 10%.
 (9270066, 2041308, 50000, 0, 185), # Scroll for Belts for DEX 10%
 (9270066, 2040318, 50000, 0, 186), # Scroll for Earring for DEX 10%
 (9270066, 2041108, 50000, 0, 187), # Scroll for Rings for DEX 10%
 (9270066, 2041305, 50000, 0, 190), # Scroll belts int 10%.
 (9270066, 2041017, 50000, 0, 191), # Scroll cape int 10%.
 (9270066, 2040302, 50000, 0, 192), # Scroll earring int 10%.
 (9270066, 2040205, 50000, 0, 193), # Scroll eye accessory int 10%.
 (9270066, 2040816, 50000, 0, 195), # Scroll gloves matt 10%.
 (9270066, 2040026, 50000, 0, 200), # Scroll helmet int 10%.
 (9270066, 2040514, 50000, 0, 205), # Scroll overall int 10%.
 (9270066, 2041105, 50000, 0, 206), # Scroll rings int 10%.
 (9270066, 2040920, 50000, 0, 209), # Scroll shield matt 10%.
 (9270066, 2043802, 50000, 0, 210), # Scroll staff matt 10%.
 (9270066, 2043702, 50000, 0, 211), # Scroll wand matt 10%.
 (9270066, 2044702, 50000, 0, 215), # Scroll claw watt 10%.
 (9270066, 2041311, 50000, 0, 216), # Scroll belts luk 10%.
 (9270066, 2041023, 50000, 0, 217), # Scroll cape luk 10%.
 (9270066, 2040323, 50000, 0, 225), # Scroll earring luk 10%.
 (9270066, 2040200, 50000, 0, 226), # Scroll eye acc luk 10%.
 (9270066, 2040805, 50000, 0, 230), # Scroll gloves watt 10%.
 (9270066, 2040002, 50000, 0, 235), # Scroll helmet def 10%.
 (9270066, 2040517, 50000, 0, 240), # Scroll overall luk 10%.
 (9270066, 2041111, 50000, 0, 241), # Scroll rings luk 10%.
 (9270066, 2040760, 50000, 0, 245), # Scroll shoes watt 10%.
  (9270066, 2340000, 10000, 0, 250), # White scroll.

 (9270066, 4001020, 10000, 0, 260), # Eos rock scroll.
 (9270066, 4001019, 10000, 0, 265), # Orbis rock scroll.
 (9270066, 4006001, 500000, 0, 275), # Summoning rock.
 (9270066, 4006000, 500000, 0, 276), # Magic rock.
 (9270066, 2002023, 3800, 0, 280), # Ginger Ale.
 (9270066, 2000005, 5000, 0, 285), # Power Elixir.
 (9270066, 2002017, 1000, 0, 290), # Warrior Elixir.
 (9270066, 2002018, 1000, 0, 295), # Wizard Elixir.
 (9270066, 2030000, 400, 0, 270), # Return scroll - nearest town.
 (9270066, 2120000, 50, 0, 300); # Pet food.

INSERT INTO `shopitems` (`shopid`, `itemid`, `price`, `pitch`, `position`) VALUES
(9270066, 1052075, 10000, 0, 301), # Blue dragon armor.
(9270066, 1082246, 50000, 0, 305), # Flamekeeper Cordon
(9270066, 1002773, 50000, 0, 310), # The Gold Dragon
(9270066, 1050081, 50000, 0, 315), # Red Battle Road - (no description)
(9270066, 1060111, 50000, 0, 320), # Blue Neos Pants - (no description)
(9270066, 1040121, 50000, 0, 325), # Blue Neos - (no description)
(9270066, 1112401, 50000, 0, 335), # Spiegelmann's Ring - (no description)
(9270066, 1112402, 50000, 0, 340), # Spiegelmann's Ring - (no description)
(9270066, 1032061, 50000, 0, 345), # Glittering Altaire Earrings - (no description)
(9270066, 1032026, 50000, 0, 350), # Gold Emerald Earrings - (no description)
(9270066, 1032070, 50000, 0, 355), # Shield Earrings - (no description)
(9270066, 1032031, 50000, 0, 360); # Timeless Earrings - (no description)
