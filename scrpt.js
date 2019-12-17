var Head = [
    ["10", "Dramatic Injury", "1", "A fine wound across the forehead and cheek. Gain 1 Bleeding Condition. Once the wound is healed, the impressive scar it leaves provides a bonus of +1 SL to appropriate social Tests. You can only gain this benefit once"],
    ["10", "Minor Cuy", "1", "The strike opens your cheek and blood flies everywhere. Gain 1 Bleeding Condition"],
    ["5", "Poked Eye", "1", "The blow glances across your eye socket. Gain 1 Blinded condition"],
    ["5", "Ear Bash", "1", "Your ear takes a sickening impact, leaving it ringing. The Gain 1 Deafened Condition"],
    ["5", "Rattling Blow", "2", "The blow floods your vision with spots and flashing lights. Gain 1 Stunned Condition"],
    ["5", "Black Eye", "2", "A solid blow hits your eye, leaving tears and much pain. Gain 2 Blinded Conditions"],
    ["5", "Sliced Ear", "2", "Your side of your head takes a hard blow, cutting deep into your ear. Gain 2 Deafened and 1 Bleeding Condition"],
    ["5", "Struck Forehead", "2", "A solid blow thumps into the centre of your forehead. Gain 2 Bleeding Conditions and a Blinded Condition that cannot be removed until all Bleeding Conditions are removed"],
    ["5", "Fractured Jaw", "3", "With a sickening crunch, pain fills your face as the blow fractures your jaw. Gain 2 Stunned Conditions. Suffer a Broken Bone (Minor) injury"],
    ["5", "Major Eye Wound", "3", "The blow cracks across your eye socket. Gain 1 Bleeding Condition. Also gain 1 Blinded Condition that cannot be removed until you receive Medical Attention"],
    ["5", "Major Ear Wound", "3", "The blow damages your ear, leaving you with permanent hearing loss in one ear. Suffer a –20 penalty on all Tests relating to hearing. If you suffer this result again, your hearing is permanently lost as the second ear falls quiet. Only magic can heal this"],
    ["5", "Broken Nose", "3", "A solid blow to the centre of your face causing blood to pour. Gain 2 Bleeding Conditions. Make a Challenging (+0) Endurance Test, or also gain a Stunned Condition. After this wound has healed, gain +1/–1 SL on social rolls, depending on context, unless Surgery is used to reset the nose"],
    ["5", "Broken Jaw", "4", "The crack is sickening as the blow hits you under the chin, breaking your jaw. Gain 3 Stunned Conditions. Make a Challenging (+0) Endurance Test or gain an Unconscious Condition. Suffer a Broken Bone (Major) injury"],
    ["5", "Concussive Blow", "4", "Your brain rattles in your skull as blood spurts from your nose and ears. Take 1 Deafened, 2 Bleeding, and 1d10 Stunned Conditions. Gain a Fatigued Condition that lasts for 1d10 days. If you receive another Critical Wound to your head while suffering this Fatigued Condition, make an Average (+20) Endurance Test or also gain an Unconscious Condition"],
    ["5", "Smashed Mouth", "4", "With a sickening crunch, your mouth is suddenly filled with broken teeth and blood. Gain 2 Bleeding Conditions. Lose 1d10 teeth — Amputation (Easy)"],
    ["5", "Mangled Ear", "4", "Little is left of your ear as the blow tears it apart. You gain 3 Deafened and 2 Bleeding Conditions. Lose your ear —Amputation (Average)"],
    ["3", "Devastated Eye", "5", "A strike to your eye completely bursts it, causing extraordinary pain. Gain 3 Blinded, 2 Bleeding, and 1 Stunned Condition. Lose your eye — Amputation (Difficult)"],
    ["3", "Disfiguring Blow", "5", "The blow smashes your entire face, destroying your eye and nose in a cloud of blood. Gain 3 Bleeding, 3 Blinded and 2 Stunned Conditions. Lose your eye and nose — Amputation (Hard)"],
    ["3", "Mangled Jaw", "5", "The blow almost removes your jaw as it utterly destroys your tongue, sending teeth flying in a shower of blood. Gain 4 Bleeding and 3 Stunned Conditions. Make a Very Hard (–30) Endurance Test or gain an Unconscious Condition. Suffer a Broken Bone (Major) injury and lose your tongue and 1d10 teeth — Amputation (Hard)"],
    ["1", "Decapitated", "Death", "Your head is entirely severed from your neck and soars through the air, landing 1d10 feet away in a random direction (see Scatter). Your body collapses, instantly dead"]
];

var Arm = [
    ["10", "Jarred Arm", "1", "Your arm is jarred in the attack. Drop whatever was held in that hand"],
    ["10", "Minor cut", "1", "Gain a Bleeding Condition as your upper arm is cut badly"],
    ["5", "Sprain", "1", "You sprain your arm, suffering a Torn Muscle (Minor) injury"],
    ["5", "Badly Jarred Arm", "2", "Your arm is badly jarred in the attack. Drop whatever was held in that hand, which is useless for 1d10 – Toughness Bonus Rounds (minimum 1). For this time, treat the hand as lost (see Amputated Parts)"],
    ["5", "Torn Muscle", "2", "The blow slams into your forearm. Gain a Bleeding Condition and a Torn Muscle (Minor) injury"],
    ["5", "Bleeding Hand", "2", "Your hand is cut badly, making your grip slippery. Take 1 Bleeding Condition. While suffering from that Bleeding Condition, make an Average (+20) Dexterity Test before taking any Action that requires something being held in that hand; if you fail, the item slips from your grip"],
    ["5", "Wrenched Arm", "2", "Your arm is almost pulled from its socket. Drop whatever is held in the associated hand; the arm is useless for 1d10 Rounds (see Amputated Parts)"],
    ["5", "Gaping Wound", "3", "The blow opens a deep, gaping wound. Gain 2 Bleeding Conditions. Until you receive Surgery to stitch up the cut, any associated Arm Damage you receive will also inflict 1 Bleeding Condition as the wound reopens"],
    ["5", "Clean Break", "3", "An audible crack resounds as the blow strikes your arm. Drop whatever was held in the associated hand and gain a Broken Bone (Minor) injury. Pass a Difficult (–10) Endurance Test or gain a Stunned Condition"],
    ["5", "Ruptured Ligament", "3", "You immediately drop whatever was held in that hand. Suffer a Torn Muscle (Major) injury"],
    ["5", "Deep Cut", "3", "Gain 2 Bleeding Conditions as your arm is mangled. Gain 1 Stunned Condition and suffer a Torn Muscle (Minor) injury. Take a Hard (–20) Endurance Test or gain the Unconscious Condition"],
    ["5", "Damaged Artery", "4", "Gain 4 Bleeding Conditions. Until you receive Surgery, every time you take Damage to this Arm Hit Location gain 2 Bleeding Conditions"],
    ["5", "Crushed Elbow", "4", "The blow crushes your elbow, splintering bone and cartilage. You immediately drop whatever was held in that hand and gain a Broken Bone (Major) injury"],
    ["5", "Dislocated Shoulder", "4", "Your arm is wrenched out of its socket. Pass a Hard (–20) Endurance Test or gain the Stunned and Prone Condition. Drop whatever is held in that hand: the arm is useless and counts as lost (see Amputated Part). Gain 1 Stunned Condition until you receive Medical Attention. After this initial Medical Attention, an Extended Average (+20) Heal Test needing 6 SL is required to reset the arm, at which point you regain its use. Tests made using this arm suffer a –10 penalty for 1d10 days"],
    ["5", "Severed Finger", "4", "You gape in horror as a finger flies — Amputation (Average). Gain a Bleeding condition"],
    ["5", "Cleft Hand", "5", "Your hand splays open from the blow. Lose 1 finger —Amputation (Difficult). Gain 2 Bleeding and 1 Stunned Condition. For every succeeding Round in which you don't receive Medical Attention, you lose another finger as the wound tears; if you run out of fingers, you lose the hand — Amputation (Difficult)"],
    ["3", "Mauled Bicep", "5", "The blow almost separates bicep and tendon from bone, leaving an ugly wound that sprays blood over you and your opponent. You automatically drop anything held in the associated hand and suffers a Torn Muscle (Major) injury and 2 Bleeding and 1 Stunned Condition"],
    ["3", "Mangled Hand", "5", "Your hand is left a mauled, bleeding mess. You lose your hand —Amputation (Hard). Gain 2 Bleeding Condition. Take a Hard (–20) Endurance Test or gain the Stunned and Prone Conditions"],
    ["3", "Sliced Tendon", "5", "Your tendons are cut by the blow, leaving your arm hanging useless — Amputation (Very Hard). Gain 3 Bleeding, 1 Prone, and 1 Stunned Condition. Pass a Hard (–20) Endurance Test or gain the Unconscious Condition"],
    ["1", "Brutal Dismemberment", "Death", "Your arm is severed, spraying arterial blood 1d10 feet in a random direction (see Scatter), before the blow follows through to your chest"]
];

var Body = [
    ["10", "‘Tis But A Scratch", "1", "Gain 1 Bleeding Condition"],
    ["10", "Gut Blow", "1", "Gain 1 Stunned Condition. Pass an Easy (+40) Endurance Test, or vomit, gaining the Prone Condition"],
    ["5", "Low Blow", "1", "Make a Hard (-20) Endurance Test or gain 3 Stunned Condition"],
    ["5", "Twisted Back", "1", "Suffer a Torn Muscle (Minor) injury"],
    ["5", "Winded", "2", "Gain a Stunned Condition. Make an Average (+20) Endurance Test, or gain the Prone Condition. Movement is halved for 1d10 rounds as you get your breath back"],
    ["5", "Bruised Rib", "2", "All Agility-based Tests suffer a –10 penalty for 1d10 days"],
    ["5", "Wrenched Collar Bone", "2", "Randomly select one arm. Drop whatever is held in that hand; the arm is useless for 1d10 rounds (see Amputated Parts)"],
    ["5", "Ragged Wound", "2", "Take 2 Bleeding Conditions"],
    ["5", "Cracked Rib", "3", "The hit cracks one or more ribs. Gain a Stunned Condition. Gain a Broken Bone (Minor) injury"],
    ["5", "Gaping Wound", "3", "Take 3 Bleeding Conditions. Until you receive Surgery, any Wounds you receive to the Body Hit Location will inflict an additional Bleeding Condition as the cut reopens"],
    ["5", "Painful Cut", "3", "Gain 2 Bleeding Conditions and a Stunned Condition. Take a Hard (–20) Endurance Test or gain the Unconscious Condition as you black out from the pain. Unless you achieve 4+ SL, you also scream out in agony"],
    ["5", "Arterial Damage", "3", "Gain 4 Bleeding Conditions. Until you receive Surgery, every time you receive Damage to the Body Hit Location, gain 2 Bleeding Conditions"],
    ["5", "Pulled Back", "4", "Your back turns to white pain as you pull a muscle. Suffer a Torn Muscle (Major) injury"],
    ["5", "Fractured Hip", "4", "Gain a Stunned Condition. Take a Challenging (+0) Endurance Test or also gain the Prone Condition. Suffer a Broken Bone (Minor) injury"],
    ["5", "Major Chest Wound", "4", "You take a significant wound to your chest, flensing skin from muscle and sinew. Take 4 Bleeding Conditions. Until you receive Surgery, to stitch the wound together, any Wounds you receive to the Body Hit Location will also inflict 2 Bleeding Conditions as the tears reopen"],
    ["5", "Gut Wound", "4", "Contract a Festering Wound (see Disease and Infection) and gain 2 Bleeding Conditions"],
    ["3", "Smashed Rib Cage", "5", "Gain a Stunned Condition that can only be removed through Medical Attention, and suffer a Broken Bone (Major) injury"],
    ["3", "Broken Collar Bone", "5", "Gain the Unconscious Condition until you receive Medical Attention, and suffer a Broken Bone (Major) injury"],
    ["3", "Internal bleeding", "5", "Gain a Bleeding Condition that can only be removed through Surgery. Contract Blood Rot (see Disease and Infection)"],
    ["1", "Torn Apart", "Death", "You are hacked in two. The top half lands in a random direction, and all characters within 2 yards are showered in blood"]
];

var Leg = [
    ["10", "Stubbed Toe", "1", "In the scuffle, you stub your toe. Pass a Routine (+20) Endurance Test or suffer –10 on Agility Tests until the end of the next turn"],
    ["10", "Twisted Ankle", "1", "You go over your ankle, hurting it. Agility Tests suffer a –10 penalty for 1d10 rounds"],
    ["5", "Minor Cut", "1", "Gain 1 Bleeding Condition"],
    ["5", "Lost Footing", "1", "In the scuffle you lose your footing. Pass a Challenging (+0) Endurance Test or gain the Prone Condition"],
    ["5", "Thigh Strike", "2", "A painful blow slams into your upper thigh. Gain a Bleeding Condition and take an Average (+20) Endurance Test or stumble, gaining the Prone Condition"],
    ["5", "Sprained Ankle", "2", "You sprain your ankle, giving you a Torn Muscle (Minor) injury"],
    ["5", "Twisted Knee", "2", "You twist your knee too far. Agility Tests suffer a –20 penalty for 1d10 rounds"],
    ["5", "Badly Cut Toe", "2", "Gain 1 Bleeding Condition. After the encounter, make a Challenging (+0) Endurance Test. If you fail, lose 1 toe —Amputation (Average)"],
    ["5", "Bad Cut", "3", "Gain 2 Bleeding conditions as a deep wound opens up your shin. Pass a Challenging (+0) Endurance Test or gain the Prone Condition"],
    ["5", "Badly Twisted Knee", "3", "You badly twist your knee trying to avoid your opponent. Gain a Torn Muscle (Major) injury"],
    ["5", "Hacked Leg", "3", "A cut bites down into the hip. Gain 1 Prone and 2 Bleeding Conditions, and suffer a Broken Bone (Minor) injury. Further, take a Hard (–20) Endurance Test or also gain a Stunned condition from the pain"],
    ["5", "Torn Thigh", "3", "Gain 3 Bleeding Conditions as the weapon opens up your upper thigh. Pass a Challenging (+0) Endurance Test or gain the Prone Condition. Until you receive Surgery to stitch up the wound, each time you receive Damage to this Leg, also receive 1 Bleeding Condition"],
    ["5", "Ruptured Tendon", "4", "Gain a Prone and Stunned Condition as one of your tendons tears badly. Pass a Hard (–20) Endurance Test or gain the Unconscious Condition. Your leg is useless (see Amputated Parts). Suffer a Torn Muscle (Major) injury"],
    ["5", "Carved Shif", "4", "The weapon drives clean through your leg by the knee, slicing into bone and through tendons. Gain a Stunned and Prone Condition. Further, suffer a Torn Muscle (Major) and Broken Bone (Minor) injury"],
    ["5", "Broken Knee", "4", "The blow hacks into your kneecap, shattering it into several pieces. You gain 1 Bleeding, 1 Prone, and 1 Stunned Condition, and a Broken Bone (Major) Injury as you fall to the ground, clutching your ruined leg"],
    ["5", "Dislocated Knee", "4", "Your knee is wrenched out of its socket. Gain the Prone Condition. Pass a Hard (–20) Endurance Test, or gain the Stunned Condition, which is not removed until you receive Medical Attention. After this initial Medical Attention, an Extended Average (+20) Heal Test needing 6 SL is required to reset the knee at which point you regain its use. Movement is halved, and Tests made using this leg suffer a –10 penalty for d10 days"],
    ["3", "Crushed Foot", "5", "The blow crushes your foot. Make an Average (+20) Endurance Test; if you fail, gain the Prone condition and lose 1 toe, plus 1 additional toe for each SL below 0 — Amputation (Average). Gain 2 Bleeding Conditions. If you don't receive Surgery within 1d10 days, you will lose the foot entirely"],
    ["3", "Severed Foot", "5", "Your foot is severed at the ankle and lands 1d10 feet away in a random direction — Amputation (Hard) (see Scatter). You gain 3 Bleeding, 2 Stunned, and 1 Prone Condition"],
    ["3", "Cut Tendon", "5", "A major tendon at the back of your leg is cut, causing you to scream out in pain as your leg collapses. Gain 2 Bleeding, 2 Stunned, and 1 Prone Condition and look on in horror as your leg never works again — Amputation (Very Hard)"],
    ["1", "Shattered Pelvis", "Death", "The blow shatters your pelvis, severing one leg then driving through to the next. You die instantly from traumatic shock"]
];

var hitArray = [
    ["10", "Head", "0"],
    ["15", "Left Arm", "1"],
    ["20", "Right Arm", "1"],
    ["25", "Body", "2"],
    ["10", "Left Leg", "3"],
    ["10", "Right Leg", "3"]
];

var hitLocations = [
    Head, Arm, Body, Leg
];

function getHitLocation() {
    var x = Math.floor(Math.random() * 100) + 1;
    var i;
    var acc = 0;
    for (i = 0; i < hitArray.length; i++) {
        var [a, b, c] = hitArray[i];
        acc = acc + parseInt(a);
        if (acc >= x)
            return [b, c];
    }
    return ["Error", []];
}

function getCritical(mod) {
    [loc, arrayIndex] = getHitLocation();
    var array = hitLocations[parseInt(arrayIndex)];
    var x = Math.max(1, Math.floor(Math.random() * 100) + 1 - mod);
    var i;
    var acc = 0;
    var [description, wounds, effects] = ["hej", "svejs", "då"];

    for (i = 0; i < array.length; i++) {
        var [a, b, c, d] = array[i];
        acc = acc + parseInt(a);
        if (acc >= x) {
            [description, wounds, effects] = [b, c, d];
            break;
        }
    }
    document.getElementById("eff").innerHTML = effects;
    document.getElementById("desc").innerHTML = description;
    document.getElementById("wou").innerHTML = wounds;
}

getCritical(0);