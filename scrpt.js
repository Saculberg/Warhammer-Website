var Head = [
    [10, "Dramatic Injury", "1", "A fine wound across the forehead and cheek. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition. Once the wound is healed, the impressive scar it leaves provides a bonus of +1 SL to appropriate social Tests. You can only gain this benefit once"],
    [10, "Minor Cut", "1", "The strike opens your cheek and blood flies everywhere. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition"],
    [5, "Poked Eye", "1", "The blow glances across your eye socket. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a> condition"],
    [5, "Ear Bash", "1", "Your ear takes a sickening impact, leaving it ringing. The Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Deafened</a> Condition"],
    [5, "Rattling Blow", "2", "The blow floods your vision with spots and flashing lights. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition"],
    [5, "Black Eye", "2", "A solid blow hits your eye, leaving tears and much pain. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a> Conditions"],
    [5, "Sliced Ear", "2", "Your side of your head takes a hard blow, cutting deep into your ear. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Deafened</a> and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition"],
    [5, "Struck Forehead", "2", "A solid blow thumps into the centre of your forehead. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions and a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a> Condition that cannot be removed until all <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions are removed"],
    [5, "Fractured Jaw", "3", "With a sickening crunch, pain fills your face as the blow fractures your jaw. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Conditions. Suffer a Broken Bone (Minor) injury"],
    [5, "Major Eye Wound", "3", "The blow cracks across your eye socket. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition. Also gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a> Condition that cannot be removed until you receive Medical Attention"],
    [5, "Major Ear Wound", "3", "The blow damages your ear, leaving you with permanent hearing loss in one ear. Suffer a -20 penalty on all Tests relating to hearing. If you suffer this result again, your hearing is permanently lost as the second ear falls quiet. Only magic can heal this"],
    [5, "Broken Nose", "3", "A solid blow to the centre of your face causing blood to pour. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Make a Challenging (+0) Endurance Test, or also gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. After this wound has healed, gain +1/-1 SL on social rolls, depending on context, unless Surgery is used to reset the nose"],
    [5, "Broken Jaw", "4", "The crack is sickening as the blow hits you under the chin, breaking your jaw. Gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Conditions. Make a Challenging (+0) Endurance Test or gain an <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition. Suffer a Broken Bone (Major) injury"],
    [5, "Concussive Blow", "4", "Your brain rattles in your skull as blood spurts from your nose and ears. Take 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Deafened</a>, 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, and <a onclick=\"rollDie(this)\">1d10</a> <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Conditions. Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Fatigued</a> Condition that lasts for <a onclick=\"rollDie(this)\">1d10</a> days. If you receive another Critical Wound to your head while suffering this <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Fatigued</a> Condition, make an Average (+20) Endurance Test or also gain an <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition"],
    [5, "Smashed Mouth", "4", "With a sickening crunch, your mouth is suddenly filled with broken teeth and blood. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Lose <a onclick=\"rollDie(this)\">1d10</a> teeth - Amputation (Easy)"],
    [5, "Mangled Ear", "4", "Little is left of your ear as the blow tears it apart. You gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Deafened</a> and 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Lose your ear - Amputation (Average)"],
    [3, "Devastated Eye", "5", "A strike to your eye completely bursts it, causing extraordinary pain. Gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a>, 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Lose your eye - Amputation (Difficult)"],
    [3, "Disfiguring Blow", "5", "The blow smashes your entire face, destroying your eye and nose in a cloud of blood. Gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Blinded</a> and 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Conditions. Lose your eye and nose - Amputation (Hard)"],
    [3, "Mangled Jaw", "5", "The blow almost removes your jaw as it utterly destroys your tongue, sending teeth flying in a shower of blood. Gain 4 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> and 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Conditions. Make a Very Hard (-30) Endurance Test or gain an <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition. Suffer a Broken Bone (Major) injury and lose your tongue and <a onclick=\"rollDie(this)\">1d10</a> teeth - Amputation (Hard)"],
    [1, "Decapitated", "Death", "Your head is entirely severed from your neck and soars through the air, landing <a onclick=\"rollDie(this)\">1d10</a> feet away in a random direction (see Scatter). Your body collapses, instantly dead"]
];

var Arm = [
    [10, "Jarred Arm", "1", "Your arm is jarred in the attack. Drop whatever was held in that hand"],
    [10, "Minor cut", "1", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition as your upper arm is cut badly"],
    [5, "Sprain", "1", "You sprain your arm, suffering a Torn Muscle (Minor) injury"],
    [5, "Badly Jarred Arm", "2", "Your arm is badly jarred in the attack. Drop whatever was held in that hand, which is useless for <a onclick=\"rollDie(this)\">1d10</a> - Toughness Bonus Rounds (minimum 1). For this time, treat the hand as lost (see Amputated Parts)"],
    [5, "Torn Muscle", "2", "The blow slams into your forearm. Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition and a Torn Muscle (Minor) injury"],
    [5, "<a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Hand", "2", "Your hand is cut badly, making your grip slippery. Take 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition. While suffering from that <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition, make an Average (+20) Dexterity Test before taking any Action that requires something being held in that hand; if you fail, the item slips from your grip"],
    [5, "Wrenched Arm", "2", "Your arm is almost pulled from its socket. Drop whatever is held in the associated hand; the arm is useless for <a onclick=\"rollDie(this)\">1d10</a> Rounds (see Amputated Parts)"],
    [5, "Gaping Wound", "3", "The blow opens a deep, gaping wound. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Until you receive Surgery to stitch up the cut, any associated Arm Damage you receive will also inflict 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition as the wound reopens"],
    [5, "Clean Break", "3", "An audible crack resounds as the blow strikes your arm. Drop whatever was held in the associated hand and gain a Broken Bone (Minor) injury. Pass a Difficult (-10) Endurance Test or gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition"],
    [5, "Ruptured Ligament", "3", "You immediately drop whatever was held in that hand. Suffer a Torn Muscle (Major) injury"],
    [5, "Deep Cut", "3", "Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions as your arm is mangled. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition and suffer a Torn Muscle (Minor) injury. Take a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition"],
    [5, "Damaged Artery", "4", "Gain 4 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Until you receive Surgery, every time you take Damage to this Arm Hit Location gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions"],
    [5, "Crushed Elbow", "4", "The blow crushes your elbow, splintering bone and cartilage. You immediately drop whatever was held in that hand and gain a Broken Bone (Major) injury"],
    [5, "Dislocated Shoulder", "4", "Your arm is wrenched out of its socket. Pass a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> and <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Drop whatever is held in that hand: the arm is useless and counts as lost (see Amputated Part). Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition until you receive Medical Attention. After this initial Medical Attention, an Extended Average (+20) Heal Test needing 6 SL is required to reset the arm, at which point you regain its use. Tests made using this arm suffer a -10 penalty for <a onclick=\"rollDie(this)\">1d10</a> days"],
    [5, "Severed Finger", "4", "You gape in horror as a finger flies - Amputation (Average). Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> condition"],
    [5, "Cleft Hand", "5", "Your hand splays open from the blow. Lose 1 finger - Amputation (Difficult). Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. For every succeeding Round in which you don't receive Medical Attention, you lose another finger as the wound tears; if you run out of fingers, you lose the hand - Amputation (Difficult)"],
    [3, "Mauled Bicep", "5", "The blow almost separates bicep and tendon from bone, leaving an ugly wound that sprays blood over you and your opponent. You automatically drop anything held in the associated hand and suffers a Torn Muscle (Major) injury and 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition"],
    [3, "Mangled Hand", "5", "Your hand is left a mauled, <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> mess. You lose your hand - Amputation (Hard). Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition. Take a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> and <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Conditions"],
    [3, "Sliced Tendon", "5", "Your tendons are cut by the blow, leaving your arm hanging useless - Amputation (Very Hard). Gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a>, and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Pass a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition"],
    [1, "Brutal Dismemberment", "Death", "Your arm is severed, spraying arterial blood <a onclick=\"rollDie(this)\">1d10</a> feet in a random direction (see Scatter), before the blow follows through to your chest"]
];

var Body = [
    [10, "'Tis But A Scratch", "1", "Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition"],
    [10, "Gut Blow", "1", "Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Pass an Easy (+40) Endurance Test, or vomit, gaining the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition"],
    [5, "Low Blow", "1", "Make a Hard (-20) Endurance Test or gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition"],
    [5, "Twisted Back", "1", "Suffer a Torn Muscle (Minor) injury"],
    [5, "Winded", "2", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Make an Average (+20) Endurance Test, or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Movement is halved for <a onclick=\"rollDie(this)\">1d10</a> rounds as you get your breath back"],
    [5, "Bruised Rib", "2", "All Agility-based Tests suffer a -10 penalty for <a onclick=\"rollDie(this)\">1d10</a> days"],
    [5, "Wrenched Collar Bone", "2", "Randomly select one arm. Drop whatever is held in that hand; the arm is useless for <a onclick=\"rollDie(this)\">1d10</a> rounds (see Amputated Parts)"],
    [5, "Ragged Wound", "2", "Take 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions"],
    [5, "Cracked Rib", "3", "The hit cracks one or more ribs. Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Gain a Broken Bone (Minor) injury"],
    [5, "Gaping Wound", "3", "Take 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Until you receive Surgery, any Wounds you receive to the Body Hit Location will inflict an additional <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition as the cut reopens"],
    [5, "Painful Cut", "3", "Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions and a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Take a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition as you black out from the pain. Unless you achieve 4+ SL, you also scream out in agony"],
    [5, "Arterial Damage", "3", "Gain 4 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Until you receive Surgery, every time you receive Damage to the Body Hit Location, gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions"],
    [5, "Pulled Back", "4", "Your back turns to white pain as you pull a muscle. Suffer a Torn Muscle (Major) injury"],
    [5, "Fractured Hip", "4", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition. Take a Challenging (+0) Endurance Test or also gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Suffer a Broken Bone (Minor) injury"],
    [5, "Major Chest Wound", "4", "You take a significant wound to your chest, flensing skin from muscle and sinew. Take 4 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. Until you receive Surgery, to stitch the wound together, any Wounds you receive to the Body Hit Location will also inflict 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions as the tears reopen"],
    [5, "Gut Wound", "4", "Contract a Festering Wound (see Disease and Infection) and gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions"],
    [3, "Smashed Rib Cage", "5", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition that can only be removed through Medical Attention, and suffer a Broken Bone (Major) injury"],
    [3, "Broken Collar Bone", "5", "Gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition until you receive Medical Attention, and suffer a Broken Bone (Major) injury"],
    [3, "Internal <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>", "5", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition that can only be removed through Surgery. Contract Blood Rot (see Disease and Infection)"],
    [1, "Torn Apart", "Death", "You are hacked in two. The top half lands in a random direction, and all characters within 2 yards are showered in blood"]
];

var Leg = [
    [10, "Stubbed Toe", "1", "In the scuffle, you stub your toe. Pass a Routine (+20) Endurance Test or suffer -10 on Agility Tests until the end of the next turn"],
    [10, "Twisted Ankle", "1", "You go over your ankle, hurting it. Agility Tests suffer a -10 penalty for <a onclick=\"rollDie(this)\">1d10</a> rounds"],
    [5, "Minor Cut", "1", "Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition"],
    [5, "Lost Footing", "1", "In the scuffle you lose your footing. Pass a Challenging (+0) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition"],
    [5, "Thigh Strike", "2", "A painful blow slams into your upper thigh. Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition and take an Average (+20) Endurance Test or stumble, gaining the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition"],
    [5, "Sprained Ankle", "2", "You sprain your ankle, giving you a Torn Muscle (Minor) injury"],
    [5, "Twisted Knee", "2", "You twist your knee too far. Agility Tests suffer a -20 penalty for <a onclick=\"rollDie(this)\">1d10</a> rounds"],
    [5, "Badly Cut Toe", "2", "Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition. After the encounter, make a Challenging (+0) Endurance Test. If you fail, lose 1 toe -Amputation (Average)"],
    [5, "Bad Cut", "3", "Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> conditions as a deep wound opens up your shin. Pass a Challenging (+0) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition"],
    [5, "Badly Twisted Knee", "3", "You badly twist your knee trying to avoid your opponent. Gain a Torn Muscle (Major) injury"],
    [5, "Hacked Leg", "3", "A cut bites down into the hip. Gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> and 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions, and suffer a Broken Bone (Minor) injury. Further, take a Hard (-20) Endurance Test or also gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> condition from the pain"],
    [5, "Torn Thigh", "3", "Gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions as the weapon opens up your upper thigh. Pass a Challenging (+0) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Until you receive Surgery to stitch up the wound, each time you receive Damage to this Leg, also receive 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Condition"],
    [5, "Ruptured Tendon", "4", "Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> and <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition as one of your tendons tears badly. Pass a Hard (-20) Endurance Test or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Unconscious</a> Condition. Your leg is useless (see Amputated Parts). Suffer a Torn Muscle (Major) injury"],
    [5, "Carved Shin", "4", "The weapon drives clean through your leg by the knee, slicing into bone and through tendons. Gain a <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> and <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Further, suffer a Torn Muscle (Major) and Broken Bone (Minor) injury"],
    [5, "Broken Knee", "4", "The blow hacks into your kneecap, shattering it into several pieces. You gain 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a>, and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition, and a Broken Bone (Major) Injury as you fall to the ground, clutching your ruined leg"],
    [5, "Dislocated Knee", "4", "Your knee is wrenched out of its socket. Gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition. Pass a Hard (-20) Endurance Test, or gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a> Condition, which is not removed until you receive Medical Attention. After this initial Medical Attention, an Extended Average (+20) Heal Test needing 6 SL is required to reset the knee at which point you regain its use. Movement is halved, and Tests made using this leg suffer a -10 penalty for <a onclick=\"rollDie(this)\">1d10</a> days"],
    [3, "Crushed Foot", "5", "The blow crushes your foot. Make an Average (+20) Endurance Test; if you fail, gain the <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> condition and lose 1 toe, plus 1 additional toe for each SL below 0 - Amputation (Average). Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a> Conditions. If you don't receive Surgery within <a onclick=\"rollDie(this)\">1d10</a> days, you will lose the foot entirely"],
    [3, "Severed Foot", "5", "Your foot is severed at the ankle and lands <a onclick=\"rollDie(this)\">1d10</a> feet away in a random direction - Amputation (Hard) (see Scatter). You gain 3 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a>, and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition"],
    [3, "Cut Tendon", "5", "A major tendon at the back of your leg is cut, causing you to scream out in pain as your leg collapses. Gain 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Bleeding</a>, 2 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Stunned</a>, and 1 <a onmouseleave=\"conditionDescRem()\" onmousemove=\"conditionDesc(event, getCondDesc(this))\">Prone</a> Condition and look on in horror as your leg never works again - Amputation (Very Hard)"],
    [1, "Shattered Pelvis", "Death", "The blow shatters your pelvis, severing one leg then driving through to the next. You die instantly from traumatic shock"]
];

var hitArray = [
    [10, "Head", 0],
    [15, "Left Arm", 1],
    [20, "Right Arm", 1],
    [25, "Body", 2],
    [10, "Left Leg", 3],
    [10, "Right Leg", 3]
];

var hitLocations = [
    Head, Arm, Body, Leg
];

var condDesc = [
    ["Ablaze", "<h3>Ablaze</h3>You are on fire! This Condition is normally only applied if you are flammable - for example: wearing clothes that can be set alight - but some magical and divine effects can set you alight even if you are not normally combustible!<br><br>At the end of every Round, you suffer 1d10 Wounds, modified by Toughness Bonus and Armour Points, with a minimum of 1 Wound suffered. Each extra Ablaze Condition you have adds +1 to the Damage suffered; so, three Ablaze Conditions result in 1d10+2 Damage suffered.<br><br>One Ablaze Condition can be removed with a successful Athletics Test, with each SL removing an extra Ablaze Condition. The Difficulty for this Test is modified by circumstances: it’s much easier to put out a fire rolling around on sand than it is in the middle of an oil-soaked kitchen."],
    ["Bleeding", "<h3>Bleeding</h3>You are bleeding badly. Lose 1 Wound at the end of every Round, ignoring all modifiers. Further, suffer a penalty of -10 to any Tests to resist Festering Wounds, Minor Infection, or Blood Rot (see page 186). If you reach 0 Wounds, you no longer lose Wounds and instead fall immediately unconscious (gain the Unconscious Condition). At the end of Round, you have a 10% chance of dying per Bleeding Condition you have; so, if you had 3 Bleeding Conditions, you would die from blood loss on a roll of 0-30. You cannot regain consciousness until all Bleeding Conditions are removed (see Injury on page 172).<br><br>A Bleeding Condition can be removed with: a successful Heal Test, with each SL removing an extra Bleeding Condition; or with any spell or prayer that heals Wounds, with one Condition removed per Wound healed.<br><br>Once all Bleeding Conditions are removed, gain one Fatigued Condition."],
    ["Blinded", "<h3>Blinded</h3>Perhaps because of a flash of light, or because of liquid sprayed in your face, you are unable to see properly. You suffer a -10 penalty to all Tests involving sight, and any opponent attacking you in close combat gains a bonus of +10 to hit you.<br><br>One Blinded Condition is removed at the end of every other Round."],
    ["Broken", "<h3>Broken</h3>You are terrified, defeated, panicked, or otherwise convinced you are going to die. On your turn, your Move and Action must be used to run away as fast as possible until you are in a good hiding place beyond the sight of any enemy; then you can use your Action on a Skill that allows you to hide more effectively. You also receive a penalty of -10 to all Tests not involving running and hiding.<br><br>You cannot Test to rally from being Broken if you are Engaged with an enemy (see page 159). If you are unengaged, at the end of each Round, you may attempt a Cool Test to remove a Broken Condition, with each SL removing an extra Broken Condition, and the Difficulty determined by the circumstances you currently find yourself: it is much easier to rally when hiding behind a barrel down an alleyway far from danger (Average +20) than it is when three steps from a slavering Daemon screaming for your blood (Very Hard -30).<br><br>If you spend a full Round in hiding out of line-of-sight of any enemy, you remove 1 Broken Condition.<br><br>Once all Broken Conditions are removed, gain 1 Fatigued Condition.</div>"],
    ["Deafened", "<h3>Deafened</h3>Whether caused by a loud noise or a blow to the head, you are unable to hear properly. You suffer a -10 penalty to all Tests involving hearing, and any opponent attacking you in close combat from the flank or rear gains an extra bonus of +10 to hit you (this bonus does not increase with multiple Deafened Conditions).<br><br>One Deafened condition is removed at the end of every other Round and is often replaced with tinnitus."],
    ["Entangled", "<h3>Entangled</h3>You are wrapped in something restricting your movement; it could be ropes, spider’s webbing, or an opponent’s bulging biceps. On your turn, you may not Move, and all your actions involving movement of any kind suffer a penalty of -10 (including Grappling; see page 163).<br><br>For your Action, you can remove an Entangled Condition if you win an Opposed Strength Test against the source of the entanglement, with each SL removing an extra Entangled Condition."],
    ["Fatigued", "<h3>Fatigued</h3>You are exhausted or stressed, and certainly in need of rest. You suffer a -10 penalty to all Tests.<br><br>Removing a Fatigued Condition normally requires rest, a spell, or a divine effect, though in some instances, such as when a Fatigued Condition is caused by carrying too much (see Encumbrance on page 293), simply changing your circumstances (carrying fewer trappings, for example) can remove a Condition."],
    ["Poisoned","<h3>Poisoned</h3>You have been poisoned or injected with venom. All Tests to remove poison have their difficulty determined by the poison or venom suffered. At the end of each Round, lose 1 Wound, ignoring all modifiers. Also, suffer a penalty of -10 to all Tests.<br><br>If you reach 0 Wounds when Poisoned, you cannot heal any Wounds until all Poisoned conditions are removed. If you fall Unconscious when Poisoned, make an Endurance Test after a number of Rounds equal to your Toughness Bonus or die horribly. See Injury on page 172 for more on this.<br><br>At the end of each Round, you may attempt an Endurance Test. If successful, remove a Poisoned Condition, with each SL removing an extra Poisoned Condition. A Heal Test provides the same results. Once all Poisoned Conditions are removed, gain 1 Fatigued Condition."],
    ["Prone", "<h3>Prone</h3>You have fallen to the ground, possibly because you have run out of Wounds, you’ve tripped, or because you’ve been hit by something rather large. On your turn, your Move can only be used to stand up or crawl at half your Movement in yards (note: if you have 0 Wounds remaining, you can only crawl). You suffer a -20 penalty to all Tests involving movement of any kind, and any opponent trying to strike you in Melee Combat gains +20 to hit you.<br><br>Unlike most other conditions, Prone does not stack - you are either Prone, or you are not. You lose the Prone Condition when you stand up."],
    ["Stunned", "<h3>Stunned</h3>You have been struck about the head or otherwise disorientated or confused; your ears are likely ringing, and little makes sense.<br><br>You are incapable of taking an Action on your turn but are capable of half your normal movement. You can defend yourself in opposed Tests - but not with Language (Magick). You also suffer a -10 penalty to all Tests. If you have any Stunned Conditions, any opponent trying to strike you in Melee Combat gains +1 Advantage before rolling the attack.<br><br>At the end of each Round, you may attempt a Challenging (+0) Endurance Test. If successful, remove a Stunned Condition, with each SL removing an extra Stunned Condition.<br><br>Once all Stunned Conditions are removed, gain 1 Fatigued Condition if you don’t already have one."],
    ["Suprised", "<h3>Suprised</h3>You have been caught unawares and you aren’t at all ready for what’s about to hit you. You can take no Action or Move on your turn and cannot defend yourself in opposed Tests. Any opponent trying to strike you in Melee Combat gains a bonus of +20 to hit.<br><br>The Surprised Condition does not stack, so you do not collect multiple Surprised Conditions, even should you be technically surprised multiple times in a Round.<br><br>At the end of each Round, or after the first attempt to attack you, you lose the Surprised Condition."],
    ["Unconscious","<h3>Unconscious</h3>You are knocked out, asleep, or otherwise insensible. You can do nothing on your turn and are completely unaware of your surroundings. Any Melee attack targeting you automatically hits on the location of the attacker’s choice with the maximum possible SL it could score, and also inflicts a Critical Wound; or, if the GM prefers, any close combat hit simply kills you. Any ranged combat hit automatically does the same if the shooter is at Point Blank range.<br><br>The Unconscious Condition does not stack — you are either Unconscious, or you are not — so you do not collect multiple Unconscious Conditions.<br><br>Recovering from unconsciousness requires different circumstances depending upon why you fell unconscious. Refer to Injury on page 172 for more on this. If you spend a Resolve point to remove an Unconscious condition, but have not resolved the cause of the incapacitation, you gain another Unconscious Condition at the end of the round. When you lose the Unconscious Condition, you gain the Prone and Fatigued Conditions."]
];

function getCondDesc(ele){
    var s = ele.innerHTML;
    for(var i = 0; i < condDesc.length; i++){
        [title, desc] = condDesc[i];
        if(title == s)
            return desc;
	}
    return "Error";
}

function rollDie(ele){
    var str = ele.innerHTML;
    var amount = 0;
    var die = 0;
    var preDie = true;
    for(i = 0; i < str.length; i++){
        if(preDie){
            if(str.charAt(i) == 'd')
                preDie = false;
            else
                amount = amount * 10 + parseInt(str.charAt(i));
		}
        else{
            die = die * 10 + parseInt(str.charAt(i));
		}
	}

    var total = 0;
    for(i = 0; i < amount; i++){
        total = total + Math.floor(Math.random() * die) + 1;
	}

    ele.innerHTML = total;
}

function getHitLocation() {
    var x = Math.floor(Math.random() * 100) + 1;
    var acc = 0;
    for (i = 0; i < hitArray.length; i++) {
        var [a, b, c] = hitArray[i];
        acc = acc + a;
        if (acc >= x)
            return [b, c];
    }
    return ["Error", []];
}

function getCritical(mod) {
    [loc, arrayIndex] = getHitLocation();
    var array = hitLocations[arrayIndex];
    var x = Math.max(1, Math.floor(Math.random() * 100) + 1 + mod);
    var acc = 0;
    var [description, wounds, effects] = [x, x, mod];

    for (i = 0; i < array.length; i++) {
        var [a, b, c, d] = array[i];
        acc = acc + a;
        if (acc >= x) {
            [description, wounds, effects] = [b, c, d];
            break;
        }
    }

    document.getElementById("eff").innerHTML = effects + ".";
    document.getElementById("desc").innerHTML = description;
    document.getElementById("wou").innerHTML = ("Wounds: " + wounds);
    document.getElementById("loc").innerHTML = loc;
}

function conditionDescRem(){
    var ob = document.getElementById("hover");
    ob.style.opacity = 0;
    ob.style.left = "0px";
    ob.style.top = "0px";
    ob.style.width = "0px";
    ob.style.height = "0px";
    ob.innerHTML = "";
}

function conditionDesc(event, content){
        
    var str = "";
    xpos = event.pageX - document.body.scrollLeft;
    ypos = event.pageY - document.body.scrollTop;

    var ob = document.getElementById("hover");
    

    ob.style.width = "20vmax";
    ob.style.height = "auto";

    ob.style.left = Math.min(xpos + 10, document.documentElement.clientWidth - ob.offsetWidth - 5) + "px";
    ob.style.top = Math.min(ypos + 10, document.documentElement.clientHeight - ob.offsetHeight - 5) + "px";
    
    ob.style.opacity = 1;

    ob.innerHTML = content;

}