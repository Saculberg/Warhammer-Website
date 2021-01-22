'use strict';


var displayCharacter = null;


//String breaker order from top to bottom: '\n', '|', '#', '[', '@', '}'

//#region Character
class Character { //String breaker: '|', '\n'
    constructor(name, species, age, height, hair, eyes, appearenceNotes, money, currentCareer, previousCareers, skills, talents, trappings, startingStats, advancmentStats, totalExp, currentExp) {
        this.name = name; //String
        this.species = species; //species
        this.age = age; //int
        this.height = height; //string
        this.hair = hair; //string
        this.eyes = eyes; //string
        this.appearenceNotes = appearenceNotes; //string
        this.money = money; //int (in copper)
        this.currentCareer = currentCareer; //Career
        this.previousCareers = previousCareers; //[Career]
        this.skills = skills; //[Skill]

        var s = Skill.getAllBasicSkills();

        for (var i = 0; i < s.length; i++) {
            this.skills = Character.addSkillToArray(this.skills, s[i], 0);
        }

        this.talents = talents; //[Talent]
        this.trappings = trappings; //[trappings]
        this.startingStats = startingStats; //[Int]
        this.advancmentStats = advancmentStats; //[Int]
        this.totalExp = totalExp; //Int
        this.currentExp = currentExp; //Int
    }

    getStatBonus(str) {
        return Math.floor(this.getStat(str) / 10);
    }

    static toLongStatName(str) {
        switch (str.toLowerCase()) {
            case "ws":
                return "Weapon Skill";
            case "bs":
                return "Ballistic Skill";
            case "t":
                return "Toughness";
            case "s":
                return "Strength";
            case "wp":
                return "Willpower";
            case "fel":
                return "Fellowship";
            case "i":
                return "Iniative";
            case "int":
                return "Intelligence";
            case "ag":
                return "Agility";
            case "dex":
                return "Dexterity";
            default:
                return "Error";
        }
    }

    getRelatedTalents(blaa) {//Dummy
        return [];
    }

    getAdvanceSkills() {
        var ret = []
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i].basic)
                ret.push(this.skills[i]);
        }

        return ret;
    }

    getBasicSkills() {
        var ret = []
        for (var i = 0; i < this.skills.length; i++) {
            if (this.skills[i].basic)
                ret.push(this.skills[i]);
        }

        return ret;
    }

    getStat(str) {
        return this.startingStats[Character.statNameToIndex(str)] + this.advancmentStats[Character.statNameToIndex(str)];
    }

    equals(other) {
        if (this.name != other.name)
            return false;
        if (!other.species.equals(this.species))
            return false;
        if (this.age != other.age)
            return false;
        if (this.height != other.height)
            return false;
        if (this.hair != other.hair)
            return false;
        if (this.eyes != other.eyes)
            return false;
        if (this.appearenceNotes != other.appearenceNotes)
            return false;
        if (this.money != other.money)
            return false;
        if (!this.currentCareer.equals(other.currentCareer))
            return false;


        if (this.previousCareers.length != other.previousCareers.length)
            return false;
        for (var i = 0; i < this.previousCareers.length; i++) {
            if (!this.previousCareers[i].equals(other.previousCareers[i])) {
                return false;
            }
        }

        if (this.skills.length != other.skills.length)
            return false;
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i].equals(other.skills[i])) {
                return false;
            }
        }

        if (this.talents.length != other.talents.length)
            return false;
        for (var i = 0; i < this.talents.length; i++) {
            if (!this.talents[i].equals(other.talents[i])) {
                return false;
            }
        }

        if (this.trappings.length != other.trappings.length)
            return false;
        for (var i = 0; i < this.trappings.length; i++) {
            if (!this.trappings[i].equals(other.trappings[i])) {
                return false;
            }
        }

        if (this.startingStats.length != other.startingStats.length)
            return false;
        for (var i = 0; i < this.startingStats.length; i++) {
            if (this.startingStats[i] != other.startingStats[i]) {
                return false;
            }
        }

        if (this.advancmentStats.length != other.advancmentStats.length)
            return false;
        for (var i = 0; i < this.advancmentStats.length; i++) {
            if (this.advancmentStats[i] != other.advancmentStats[i]) {
                return false;
            }
        }

        if (this.totalExp != other.totalExp)
            return false;
        if (this.currentExp != other.currentExp)
            return false;

        return true;
    }

    static generateRandom(race) {

        var name = race.getRandomName();
        var species = race;
        var age = race.getRandomAge();
        var height = race.getRandomHeight();
        var eyes = race.getRandomEye();
        var hair = race.getRandomHair();
        var notes = "";

        var currentCareer = Career.getRandomCareer(race.jobArray);

        var stats = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (var i = 0; i < race.startingStatMods.length; i++) {
            stats[i] = race.startingStatMods[i] + rollDice(2, 10);
        }

        var statAdv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        statAdv[Character.statNameToIndex(currentCareer.statMatrix[0][0])] = 2;
        statAdv[Character.statNameToIndex(currentCareer.statMatrix[0][1])] = 2;
        statAdv[Character.statNameToIndex(currentCareer.statMatrix[0][2])] = 1;


        var skills = [];
        for (var i = 0; i < 3; i++) {
            skills.push(race.skills.splice(rand(0, race.skills.length), 1)[0][0].advance(5));
        }
        for (var i = 0; i < 3; i++) {
            skills.push(race.skills.splice(rand(0, race.skills.length), 1)[0][0].advance(3));
        }

        var s = currentCareer.getAvailableSkills();

        for (var i = 0; i < 40; i++) {
            var roll = rand(1, s.length);
            var c = true;
            for (var j = 0; j < skills.length; j++) {
                if (skills[j].getName == s[roll]) {
                    if (skills[j].advancments >= 10) {
                        c = false;
                    }
                }
            }
            if (c)
                skills = Character.addSkillToArray(skills, s[roll], 1);
            else
                i--;
        }

        var t = currentCareer.getAvailableTalents();

        var talents = [];
        for (var i = 0; i < race.talents.length; i++) {
            var roll = rand(0, race.talents[i].length);
            talents = Character.addTalentToArray(talents, race.talents[i][roll]);
        }

        var roll = rand(0, t.length);
        talents = Character.addTalentToArray(talents, t[roll]);

        return new Character(name, Species.generateFromString(species.name), age, height, hair, eyes, "", 0, currentCareer, [], skills, talents, [], stats, statAdv, 120, 120);
    }

    static addTalentToArray(arr, skill) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name.toLowerCase().trim() == skill.name.toLowerCase().trim()) {
                arr[i].timesTaken++;
                return arr;
            }
        }
        skill.timesTaken = 1;
        arr.push(skill);
        return arr;
    }

    static addSkillToArray(arr, skill, amount) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getName().toLowerCase().trim() == skill.getName().toLowerCase().trim()) {
                arr[i].advance(amount);
                return arr;
            }
        }
        arr.push(skill.advance(amount));
        return arr;
    }

    //can't be arsed to actually research XML proper sooooooo, yeah
    static generateFromString(dataString) {
        var data = dataString.split("\n");
        var baseData = data[0].split("|");

        var name = baseData[0];
        var species = Species.generateFromString(baseData[1]);
        var age = parseInt(baseData[2]);
        var height = baseData[3];
        var hair = baseData[4];
        var eyes = baseData[5];
        var appearenceNotes = baseData[6];
        var money = parseInt(baseData[7]);

        var currentCareer = Career.generateFromString(data[1]);

        //console.log(data[1]);
        //console.log(currentCareer);

        var prevCarData = data[2].split("|");
        var previousCareers = [];


        if (data[2].trim() != "")
            for (var i = 0; i < prevCarData.length; i++) {
                previousCareers.push(Career.generateFromString(prevCarData[i]));
            }

        var skillData = data[3].split("|");
        var skills = [];

        if (data[3].trim() != "")
            for (var i = 0; i < skillData.length; i++) {
                skills.push(Skill.generateFromString(skillData[i]));
            }

        var talentData = data[4].split("|");
        var talents = [];
        if (data[4].trim() != "")
            for (var i = 0; i < talentData.length; i++) {
                talents.push(Talent.generateFromString(talentData[i]));
            }

        var trappingData = data[5].split("|");
        var trappings = [];

        if (data[5].trim() != "")
            for (var i = 0; i < trappingData.length; i++) {
                trappings.push(Trapping.generateFromString(trappingData[i]));
            }

        var startStatData = data[6].split("|");
        var startingStats = [];
        for (var i = 0; i < startStatData.length; i++) {
            startingStats.push(parseInt(startStatData[i]));
        }

        var advancementData = data[7].split("|");
        var advancmentStats = [];
        for (var i = 0; i < advancementData.length; i++) {
            advancmentStats.push(parseInt(advancementData[i]));
        }

        var totalExp = parseInt(data[8]);
        var currentExp = parseInt(data[9]);

        return new Character(name, species, age, height, hair, eyes, appearenceNotes, money, currentCareer, previousCareers, skills, talents, trappings, startingStats, advancmentStats, totalExp, currentExp);
    }

    toString() {
        var str = "";

        str += this.name + "|" + this.species.name + "|" + this.age.toString() + "|" + this.height + "|" + this.hair + "|" + this.eyes + "|" + this.appearenceNotes + "|" + this.money.toString() + '\n';

        str += this.currentCareer.toString() + '\n';

        for (var i = 0; i < this.previousCareers.length; i++) {
            str += this.previousCareers[i].toString() + ((this.previousCareers.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        for (var i = 0; i < this.skills.length; i++) {
            str += this.skills[i].toString() + ((this.skills.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        for (var i = 0; i < this.talents.length; i++) {
            str += this.talents[i].toString() + ((this.talents.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        for (var i = 0; i < this.trappings.length; i++) {
            str += this.trappings[i].toString() + ((this.trappings.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        for (var i = 0; i < this.startingStats.length; i++) {
            str += this.startingStats[i].toString() + ((this.startingStats.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        for (var i = 0; i < this.advancmentStats.length; i++) {
            str += this.advancmentStats[i].toString() + ((this.advancmentStats.length - 1 == i) ? "" : "|");
        }

        str += '\n';

        str += this.totalExp + "\n" + this.currentExp;

        return str;
    }

    static statNameToIndex(str) {
        switch (str.toLowerCase()) {
            case "ws":
                return 0;
            case "bs":
                return 1;
            case "s":
                return 2;
            case "t":
                return 3;
            case "i":
                return 4;
            case "ag":
                return 5;
            case "dex":
                return 6;
            case "int":
                return 7;
            case "wp":
                return 8;
            case "fel":
                return 9;
            default:
                return -1;
        }
    }
}
//#endregion

//#region Species
////////////////////////////////////////////////////////////////////////////////////
//Species
////////////////////////////////////////////////////////////////////////////////////

class Species {
    constructor() {
        this.name = "";
        this.jobArray = [];
        this.startingStatMods = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.hitPointCalc = "";
        this.fate = 0;
        this.resilience = 0;
        this.extraPoints = 0;
        this.movment = 0;

        this.skills = [[]];

        this.talents = [[]];
    }

    equals(other) {
        if (this.name != other.name)
            return false;

        if (this.jobArray.length != other.jobArray.length)
            return false;
        for (var i = 0; i < this.jobArray.length; i++) {
            if (this.jobArray[i] != other.jobArray[i]) {
                return false;
            }
        }


        if (this.startingStatMods.length != other.startingStatMods.length)
            return false;
        for (var i = 0; i < this.startingStatMods.length; i++) {
            if (this.startingStatMods[i] != other.startingStatMods[i]) {
                return false;
            }
        }

        if (this.hitPointCalc != other.hitPointCalc)
            return false;
        if (this.fate != other.fate)
            return false;
        if (this.resilience != other.resilience)
            return false;
        if (this.extraPoints != other.extraPoints)
            return false;
        if (this.movment != other.movment)
            return false;


        if (this.skills.length != other.skills.length)
            return false;
        for (var i = 0; i < this.skills.length; i++) {
            if (!this.skills[i][0].equals(other.skills[i][0])) {
                return false;
            }
        }


        if (this.talents.length != other.talents.length)
            return false;

        return true;
    }

    static generateFromString(speciesName) {
        switch (speciesName) {
            case "Human":
                return new Human();
            case "Dwarf":
                return new Dwarf();
            case "Halfling":
                return new Halfling();
            case "High Elf":
                return new HighElf();
            case "Wood Elf":
                return new WoodElf();
            default:
                return new Human();
        }
    }

    getRandomName() {
        console.trace();
        return "Error";
    }

    getRandomAge() {
        console.trace();
        return "Error";
    }

    getRandomHeight() {
        console.trace();
        return "Error";
    }

    getRandomEye() {
        console.trace();
        return "Error";
    }

    getRandomHair() {
        console.trace();
        return "Error";
    }
}

class Human extends Species {
    constructor() {
        super();
        this.name = "Human";
        this.jobArray = [
            1, 1, 1, 2, 1, 5, 2, 1,
            1, 2, 2, 1, 1, 2, 3, 1,
            1, 1, 1, 1, 1, 3, 1, 1,
            1, 1, 1, 2, 1, 1, 1, 5,
            1, 1, 2, 2, 1, 1, 1, 1,
            2, 1, 2, 3, 2, 1, 2, 1,
            2, 1, 1, 1, 4, 1, 3, 1,
            2, 2, 1, 1, 1, 4, 0, 1];

        this.startingStatMods = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
        this.hitPointCalc = "SB+(2*TB)+WPB";
        this.fate = 2;
        this.resilience = 1;
        this.extraPoints = 3;
        this.movment = 4;

        this.skills = [
            Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm"),
            Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Evaluate"),
            Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"),
            Skill.getFromDatabase("Language(Bretonnian)"), Skill.getFromDatabase("Language(Wastelander)"),
            Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Reikland)"),
            Skill.getFromDatabase("Melee(Basic)"), Skill.getFromDatabase("Ranged(Bow)")];

        this.talents = [Talent.getFromDatabase("Doomed"), [Talent.getFromDatabase("Savvy")[0], Talent.getFromDatabase("Suave")[0]]];
        for (var r = 0; r < 3; r++) {
            var t = Talent.rollRandom();
            var c = true;
            for (var i = 0; i < this.talents.length; i++) {
                for (var j = 0; j < this.talents[i].length; j++) {
                    if (this.talents[i][j].equals(t)) {
                        c = false;
                        r--;
                    }
                }
            }
            if (c)
                this.talents.push(t);
        }
    }

    getRandomName() {
        var forename =
            ["Adhemar", "Anders", "Artur", "Beatrijs", "Clementia", "Detlev",
                "Erika", "Frauke", "Frederich", "Gerner", "Gertraud", "Haletha", "Heinrich",
                "Helga", "Henryk", "Irmina", "Jehanne", "Karl", "Kruger", "Lorelay", "Marieke",
                "Sebastien", "Sigfreda", "Talther", "Talunda", "Ulrich", "Ulrika", "Werther",
                "Willelma", "Wilryn"];
        return forename[rand(0, forename.length)];
    }

    getRandomAge() {
        return 15 + rollDice(1, 10);
    }

    getRandomHeight() {
        var inches = 9 + rollDice(2, 10);
        var feet = 4 + Math.floor(inches / 12);
        inches = inches % 12;

        return feet + "’" + inches + "”";
    }

    getRandomEye() {
        var table = [
            [2, "Free Choice"],
            [1, "Green"],
            [1, "Pale Blue"],
            [3, "Blue"],
            [4, "Pale Grey"],
            [3, "Grey"],
            [3, "Brown"],
            [1, "Hazel"],
            [1, "Dark Brown"],
            [1, "Black"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

    getRandomHair() {
        var table = [
            [2, "White Blond"],
            [1, "Golden Blond"],
            [1, "Red Blond"],
            [3, "Golden Brown"],
            [4, "Light Brown"],
            [3, "Dark Brown"],
            [3, "Black"],
            [1, "Auburn"],
            [1, "Red"],
            [1, "Grey"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }
}

class Dwarf extends Species {
    constructor() {
        super();
        this.name = "Dwarf";
        this.jobArray = [
            1, 3, 2, 0, 1, 0, 2, 0,
            2, 6, 1, 2, 4, 1, 6, 3,
            3, 1, 1, 2, 1, 1, 1, 2,
            2, 0, 0, 2, 5, 0, 1, 1,
            4, 1, 2, 0, 2, 2, 0, 0,
            2, 1, 0, 2, 1, 2, 2, 1,
            0, 0, 1, 0, 3, 1, 1, 0,
            0, 3, 0, 3, 3, 3, 4, 0];

        this.startingStatMods = [30, 20, 20, 30, 20, 10, 30, 20, 40, 10];
        this.hitPointCalc = "SB+(2*TB)+WPB";
        this.fate = 0;
        this.resilience = 2;
        this.extraPoints = 2;
        this.movment = 3;

        this.skills = [
            Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"),
            Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain(Storytelling)"),
            Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intimidate"),
            Skill.getFromDatabase("Language(Khazalid)"), Skill.getFromDatabase("Lore(Dwarfs)"),
            Skill.getFromDatabase("Lore(Geology)"), Skill.getFromDatabase("Lore(Metallurgy)"),
            Skill.getFromDatabase("Melee(Basic)"), Skill.getFromDatabase("Trade(Any)")];

        this.talents = [Talent.getFromDatabase("Magic Resistance"), Talent.getFromDatabase("Night Vision"),
        [Talent.getFromDatabase("Read/Write")[0], Talent.getFromDatabase("Relentless")[0]],
        [Talent.getFromDatabase("Resolute")[0], Talent.getFromDatabase("Strong-minded")[0]],
        Talent.getFromDatabase("Sturdy")];
    }

    getRandomName() {
        var gender = rand(0, 2);
        var male = ["Alrik", "Dimzad", "Gottri", "Snorri"];
        var female = ["Bronda", "Fenna", "Gudrun"];

        var parentG = rand(0, 2);
        var femaleSuffix = ["sdottir", "sniz"];
        var maleSuffix = ["snev", "sson"];

        var name = (gender == 0) ? male : female;
        var parent = (parentG == 0) ? male : female;
        var suffix = (gender == 0) ? maleSuffix : femaleSuffix;

        var clan = ["Ardrungan", "Bryntok", "Gazani",
            "Gromheld", "Harrazlings", "Unboki", "Dokkintroll", "Ganvalgger",
            "Kvitang", "Thrungtak", "Wyrgrinti", "Zankonk"];
        return name[rand(0, name.length)] + " " + parent[rand(0, parent.length)] + suffix[rand(0, suffix.length)] + " of clan " + clan[rand(0, clan.length)];
    }

    getRandomAge() {
        return 15 + rollDice(10, 10);
    }

    getRandomHeight() {
        var inches = 3 + rollDice(1, 10);
        var feet = 4 + Math.floor(inches / 12);
        inches = inches % 12;

        return feet + "’" + inches + "”";
    }

    getRandomEye() {
        var table = [
            [2, "Coal"],
            [1, "Lead"],
            [1, "Steel"],
            [3, "Blue"],
            [4, "Earth Brown"],
            [3, "Dark Brown"],
            [3, "Hazel"],
            [1, "Green"],
            [1, "Copper"],
            [1, "Gold"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

    getRandomHair() {
        var table = [
            [2, "White"],
            [1, "Grey"],
            [1, "Pale Blond"],
            [3, "Golden"],
            [4, "Copper"],
            [3, "Bronze"],
            [3, "Brown"],
            [1, "Dark Brown"],
            [1, "Reddish Brown"],
            [1, "Black"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }
}

class Halfling extends Species {
    constructor() {
        super();
        this.name = "Halfling";
        this.jobArray = [
            1, 1, 2, 0, 2, 0, 2, 0,
            2, 5, 4, 2, 4, 3, 3, 2,
            1, 2, 0, 1, 0, 6, 1, 2,
            1, 0, 3, 2, 1, 0, 1, 3,
            1, 2, 3, 0, 2, 2, 1, 0,
            1, 1, 1, 3, 1, 4, 3, 0,
            3, 1, 1, 1, 1, 1, 4, 0,
            0, 2, 0, 1, 0, 3, 0, 0];

        this.startingStatMods = [10, 30, 10, 20, 20, 20, 30, 20, 30, 30];
        this.hitPointCalc = "(2*TB)+WPB";
        this.fate = 0;
        this.resilience = 2;
        this.extraPoints = 3;
        this.movment = 3;

        this.skills = [
            Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"),
            Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Gamble"),
            Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Haggle"),
            Skill.getFromDatabase("Language(Mootish)"), Skill.getFromDatabase("Lore(Reikland)"),
            Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Sleight of Hand"),
            Skill.getFromDatabase("Stealth(Any)"), Skill.getFromDatabase("Trade(Cook)")];

        this.talents = [Talent.getFromDatabase("Acute Sense (Taste)"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Etiquette (Chaos)"), Talent.getFromDatabase("Small")];
        for (var r = 0; r < 2; r++) {
            var t = Talent.rollRandom();
            var c = true;
            for (var i = 0; i < this.talents.length; i++) {
                for (var j = 0; j < this.talents[i].length; j++) {
                    if (this.talents[i][j].equals(t)) {
                        c = false;
                        r--;
                    }
                }
            }
            if (c)
                this.talents.push(t);
        }
    }


    getRandomName() {
        var forename = [
            "Antoniella(Anni)", "Esmerelda(Esme)",
            "Ferdinand(Fred)", "Heironymus(Hiro)",
            "Maximilian(Max)", "Theodosius(Theo)",
            "Thomasina(Tina)"
        ];

        var clan = [
            "Ashfield", "Brandysnap", "Hayfoot",
            "Rumster", "Shortbottom", "Thorncobble"
        ];
        return forename[rand(0, forename.length)] + " " + clan[rand(0, clan.length)];
    }

    getRandomAge() {
        return 15 + rollDice(5, 10);
    }

    getRandomHeight() {
        var inches = 1 + rollDice(1, 10);
        var feet = 3 + Math.floor(inches / 12);
        inches = inches % 12;

        return feet + "’" + inches + "”";
    }

    getRandomEye() {
        var table = [
            [2, "Light Grey"],
            [1, "Grey"],
            [1, "Pale Blue"],
            [3, "Blue"],
            [4, "Green"],
            [3, "Hazel"],
            [3, "Brown"],
            [1, "Copper"],
            [1, "Dark Brown"],
            [1, "Dark Brown"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

    getRandomHair() {
        var table = [
            [2, "Grey"],
            [1, "Flaxen"],
            [1, "Russet"],
            [3, "Honey"],
            [4, "Chestnut"],
            [3, "Ginger"],
            [3, "Mustard"],
            [1, "Almond"],
            [1, "Chocolate"],
            [1, "Liquorice"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }
}

class HighElf extends Species {
    constructor() {
        super();
        this.name = "High Elf";
        this.jobArray = [
            2, 0, 4, 0, 2, 0, 4, 4,
            0, 3, 0, 2, 5, 0, 2, 1,
            2, 1, 2, 3, 3, 0, 3, 2,
            0, 0, 2, 3, 0, 0, 6, 0,
            3, 0, 3, 0, 1, 0, 0, 0,
            1, 0, 0, 0, 15, 1, 0, 0,
            2, 3, 0, 0, 3, 0, 0, 0,
            4, 2, 1, 2, 1, 2, 0, 0];

        this.startingStatMods = [30, 30, 20, 20, 40, 30, 30, 30, 30, 20];
        this.hitPointCalc = "SB+(2*TB)+WPB";
        this.fate = 0;
        this.resilience = 0;
        this.extraPoints = 2;
        this.movment = 5;

        this.skills = [
            Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Entertain (Sing)"),
            Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Language (Eltharin)"),
            Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Melee (Basic)"),
            Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Perception"),
            Skill.getFromDatabase("Play (any)"), Skill.getFromDatabase("Ranged (Bow)"),
            Skill.getFromDatabase("Sail"), Skill.getFromDatabase("Swim")];

        this.talents = [Talent.getFromDatabase("Acute Sense (Sight)"),
        [Talent.getFromDatabase("Coolheaded")[0], Talent.getFromDatabase("Savvy")[0]],
        Talent.getFromDatabase("Night Vision"),
        [Talent.getFromDatabase("Second Sight")[0], Talent.getFromDatabase("Sixth Sense")[0]],
        Talent.getFromDatabase("Read/Write")];
    }


    getRandomName() {
        var first = ["Aes", "Ath", "Far", "Gal", "Im", "Lin", "Mal", "Mor", "Ullia"];
        var second = ["a", "ath", "dia", "en", "for", "lor", "mar", "ol", "sor", "than"];
        var end = ["andril", "anel", "ellion", "fin", "il", "irian", "mor", "nil", "ric", "wing"];

        return first[rand(0, first.length)] + second[rand(0, second.length)] + end[rand(0, end.length)];
    }

    getRandomAge() {
        return 30 + rollDice(10, 10);
    }

    getRandomHeight() {
        var inches = 11 + rollDice(1, 10);
        var feet = 5 + Math.floor(inches / 12);
        inches = inches % 12;

        return feet + "’" + inches + "”";
    }

    getRandomEye() {
        var table = [
            [2, "Jet"],
            [1, "Amethyst"],
            [1, "Aquamarine"],
            [3, "Sapphire"],
            [4, "Turquoise"],
            [3, "Emerald"],
            [3, "Amber"],
            [1, "Copper"],
            [1, "Citrine"],
            [1, "Gold"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

    getRandomHair() {
        var table = [
            [2, "Silver"],
            [1, "White"],
            [1, "Pale Blond"],
            [3, "Blond"],
            [4, "Yellow Blond"],
            [3, "Copper Blond"],
            [3, "Red Blond"],
            [1, "Auburn"],
            [1, "Red"],
            [1, "Black"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

}

class WoodElf extends Species {
    constructor() {
        super();
        this.name = "Wood Elf";
        this.jobArray = [
            0, 0, 0, 0, 0, 0, 1, 4,
            0, 5, 0, 0, 0, 0, 0, 0,
            4, 4, 0, 7, 6, 0, 4, 0,
            0, 0, 7, 10, 0, 5, 11, 0,
            2, 0, 5, 0, 3, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 6, 0, 0, 0,
            5, 2, 2, 2, 0, 4, 0, 0];

        this.startingStatMods = [30, 30, 20, 20, 40, 30, 30, 30, 30, 20];
        this.hitPointCalc = "SB+(2*TB)+WPB";
        this.fate = 0;
        this.resilience = 0;
        this.extraPoints = 2;
        this.movment = 5;

        this.skills = [
            Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"),
            Skill.getFromDatabase("Entertain (Sing)"), Skill.getFromDatabase("Intimidate"),
            Skill.getFromDatabase("Language (Eltharin)"), Skill.getFromDatabase("Melee (Basic)"),
            Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception"),
            Skill.getFromDatabase("Stealth (Rural)"), Skill.getFromDatabase("Ranged (Bow)"),
            Skill.getFromDatabase("Track"), Skill.getFromDatabase("Endurance")];

        this.talents = [Talent.getFromDatabase("Acute Sense (Sight)"),
        [Talent.getFromDatabase("Hardy")[0], Talent.getFromDatabase("Second Sight")[0]],
        Talent.getFromDatabase("Night Vision"),
        [Talent.getFromDatabase("Read/Write")[0], Talent.getFromDatabase("Very Resilient")[0]],
        Talent.getFromDatabase("Rover")];
    }

    getRandomName() {
        var first = ["Aes", "Ath", "Far", "Gal", "Im", "Lin", "Mal", "Mor", "Ullia"];
        var second = ["a", "ath", "dia", "en", "for", "lor", "mar", "ol", "sor", "than"];
        var end = ["arha", "anhu", "dda", "han", "loc", "noc", "oth", "ryn", "stra", "wyth"];

        return first[rand(0, first.length)] + second[rand(0, second.length)] + end[rand(0, end.length)];
    }

    getRandomAge() {
        return 30 + rollDice(10, 10);
    }

    getRandomHeight() {
        var inches = 11 + rollDice(1, 10);
        var feet = 5 + Math.floor(inches / 12);
        inches = inches % 12;

        return feet + "’" + inches + "”";
    }

    getRandomEye() {
        var table = [
            [2, "Ivory"],
            [1, "Charcoal"],
            [1, "Ivy Green"],
            [3, "Mossy Green"],
            [4, "Chestnut"],
            [3, "Chestnut"],
            [3, "Dark Brown"],
            [1, "Tan"],
            [1, "Sandy Brown"],
            [1, "Violet"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

    getRandomHair() {
        var table = [
            [2, "Birch Silver"],
            [1, "Ash Blond"],
            [1, "Rose Gold"],
            [3, "Honey Blond"],
            [4, "Brown"],
            [3, "Mahogany Brown"],
            [3, "Dark brown"],
            [1, "Sienna"],
            [1, "Ebony"],
            [1, "Blue-Black"]];
        var roll = rollDice(2, 10);
        var acc = 0;
        for (var i = 0; i < table.length; i++) {
            acc += table[i][0];
            if (acc >= roll)
                return table[i][1]
        }
    }

}
//#endregion

//#region Talents
////////////////////////////////////////////////////////////////////////////////////
//Talents
////////////////////////////////////////////////////////////////////////////////////

class Talent { //String breaker: '@'
    constructor(name, description, max, test, timesTaken) {
        this.name = name; //String
        this.description = description; //String
        this.max = max; //Max
        this.test = test; //Test

        this.timesTaken = timesTaken; //Int
    }

    take() {
        this.timesTaken++;
        return this;
    }

    equals(other) {
        if (this.name != other.name)
            return false;
        if (this.description != other.description)
            return false;
        if (!this.max.equals(other.max))
            return false;
        if (!this.test.equals(other.test))
            return false;
        if (this.timesTaken != other.timesTaken)
            return false;
        return true;
    }

    static getAllTalents() {
        var allTalents = [
            new Talent("Accurate Shot", "You are an exceptional shot and know where to shoot an enemy in order to inflict maximum damage. You deal your Accurate Shot level in extra Damage with all ranged weapons. ", new Max(false, -1, "BS"), new Test("", ""), 0),
            new Talent("Acute Sense (Sight)", "Your sense of Sight is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details associated with Sight, as dictated by the GM.", new Max(false, -1, "I"), new Test("Perception", "(Sense)"), 0),
            new Talent("Acute Sense (Hearing)", "Your sense of Hearing is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details associated with Hearing, as dictated by the GM.", new Max(false, -1, "I"), new Test("Perception", "(Sense)"), 0),
            new Talent("Acute Sense (Taste)", "Your sense of Taste is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details associated with Taste, as dictated by the GM.", new Max(false, -1, "I"), new Test("Perception", "(Sense)"), 0),
            new Talent("Acute Sense (Touch)", "Your sense of Touch is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details associated with Touch, as dictated by the GM.", new Max(false, -1, "I"), new Test("Perception", "(Sense)"), 0),
            new Talent("Acute Sense (Smell)", "Your sense of Smell is highly developed, allowing you to spot what others miss. You may take Perception Tests to detect normally imperceptible details associated with Smell, as dictated by the GM.", new Max(false, -1, "I"), new Test("Perception", "(Sense)"), 0),
            new Talent("Aethyric Attunement", "Your experience, talent or training lets you more safely manipulate the Winds of Magic. You do not suffer a Miscast if you roll a double on a successful Channel Test. ", new Max(false, -1, "I"), new Test("Channel", "(Any)"), 0),
            new Talent("Alley Cat", "You are at home in shadowy backstreets. When using Stealth (Urban), you may reverse the dice of any failed Test if this will score a Success. ", new Max(false, -1, "I"), new Test("Stealth(Urban)", ""), 0),
            new Talent("Ambidextrous", "You can use your off-hand far better than most folk, either by training or innate talent. You only suffer a penalty of –10 to Tests relying solely on your secondary hand, not –20. If you have this Talent twice, you suffer no penalty at all. ", new Max(true, 2, ""), new Test("", ""), 0),
            new Talent("Animal Affinity", "Wild animals feel comfortable in your presence, and often follow your lead. All creatures with the Bestial Trait not trained to be belligerent will automatically be calm in your presence unless they have a reason not to be, such as pain, an attack, being naturally hyper-aggressive, or having nearby young. ", new Max(false, -1, "WP"), new Test("Charm Animal", ""), 0),
            new Talent("Arcane Magic (Fire)", "You have studied the Lore of Fire. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Beast)", "You have studied the Lore of Beast. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Light)", "You have studied the Lore of Light. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Life)", "You have studied the Lore of Life. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Metal)", "You have studied the Lore of Metal. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Shadow)", "You have studied the Lore of Shadow. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Heavens)", "You have studied the Lore of Heavens. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Death)", "You have studied the Lore of Death. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Necromancy)", "You have studied the Lore of Necromancy. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Hedgecraft)", "You have studied the Lore of Hedgecraft. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Arcane Magic (Witchery)", "You have studied the Lore of Witchery. You may now memorise spells from your chosen Lore for the following cost in XP. Number of Spells Currently Known XP Cost for a new spell Intelligence Bonus × 1 100 XP Intelligence Bonus × 2 200 XP Intelligence Bonus × 3 300 XP Intelligence Bonus × 4 400 XP ...and so on. So, if your Intelligence Bonus is 4, it will cost you 100 XP for the first 4 spells, then 200 XP for the next 4, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. Under normal circumstances, you may not learn more than one Arcane Magic (Lore) Talent. Further, you may not learn the Bless or Invoke Talents when you have the Arcane Magic Talent. You can unlearn this Talent for 100 XP, but will immediately lose all of your spells if you do so. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Argumentative", "You are used to arguing your points and winning. If you roll a successful Charm Test to debate with an opponent, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 24 could be used for +4 SL. ", new Max(false, -1, "Fel"), new Test("Charm", "Tests"), 0),
            new Talent("Artistic", "You have a natural talent for art, able to produce precise sketches with nothing but time and appropriate media. This ability has several in-game uses, ranging from creating Wanted Posters to sketching accurate journals, and has spot benefits as determined by the GM. Further to this, add Trade (Artist) to any Career you enter; if it is already in Career, you may instead purchase the Skill for 5 XP fewer per Advance. ", new Max(false, -1, "Dex"), new Test("Trade", "(Artist)"), 0),
            new Talent("Attractive", "Whether it’s your piercing eyes, your strong frame, or maybe the way you flash your perfect teeth, you know how to make the best use of what the gods gave you. When you successfully use Charm to influence those attracted to you, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 38 could be used for +8 SL. ", new Max(false, -1, "Fel"), new Test("Charm", "Tests"), 0),
            new Talent("Battle Rage", "You are better able to control your Frenzy in combat. You can end your Frenzy with a successful Cool Test at the end of the round. ", new Max(false, -1, "WP"), new Test("Melee", "Tests"), 0),
            new Talent("Beat Blade", "You are trained to make sharp controlled blows to your opponent’s weapon, creating an opening for an attack or simply impeding an incoming attack. For your Action, you can choose to Beat Blade before rolling. Perform a Melee Test; if successful, your opponent loses –1 Advantage, and loses a further –1 per SL you score. This Test is not Opposed. This Talent is of no use if your opponent has no weapon, or has a larger Size than you (see page 341). ", new Max(false, -1, "WS"), new Test("Melee", "for"), 0),
            new Talent("Beneath Notice", "The high and mighty pay no attention to your presence, knowing you are well beneath their notice. Assuming you are properly attired and not in an incongruous position, those of a higher Status Tier will normally ignore you unless your presence becomes inappropriate, which can make it very easy to listen into conversations you perhaps shouldn’t. Further, characters with a higher Status Tier than you gain no Advantage for striking or wounding you in combat, as there is nothing to be gained for defeating such a lowly cur. ", new Max(false, -1, "Fel"), new Test("Stealth", "when"), 0),
            new Talent("Berserk Charge", "You hurl yourself at your enemies with reckless abandon, using the force of your charge to add weight to your strikes. When you Charge, you gain +1 Damage to all Melee attacks per level in this Talent. ", new Max(false, -1, "S"), new Test("Melee", "on"), 0),
            new Talent("Blather", "Called ‘opening your mouth and letting your belly rumble’ in Nordland, or simply ‘bullshitting’ in Ostland, blathering involves talking rapidly and incessantly, or talking volubly and at-length, about inconsequential or nonsense matters, and is used to verbally confuse and confound a target. You use your Charm Skill to Blather. Attempt an Opposed Charm/Intelligence Test. Success gives your opponent a Stunned Condition. Further, for each level you have in Blather, your opponent gains another Stunned Condition. Targets Stunned by Blather may do nothing other than stare at you dumbfounded as they try to catch-up with or understand what you are saying. Once the last Stunned Condition comes to an end, the target finally gets a word in, and may not be best pleased with you — after all, you have been talking about nothing or nonsense for some time. Should you stop talking, your opponent immediately loses all Stunned Conditions caused by your Blather. Generally, you can only attempt to Blather at a character once per scene, or perhaps longer as determined by the GM, as the target soon wises up to your antics. ", new Max(false, -1, "Fel"), new Test("Charm", "to"), 0),
            new Talent("Bless (Manann)", "You are watched over by Manann and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Morr)", "You are watched over by Morr and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Myrmidia)", "You are watched over by Myrmidia and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Ranald)", "You are watched over by Ranald and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Rhya)", "You are watched over by Rhya and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Shallya)", "You are watched over by Shallya and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Sigmar)", "You are watched over by Sigmar and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Taal)", "You are watched over by Taal and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Ulric)", "You are watched over by Ulric and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bless (Verena)", "You are watched over by Verena and can empower simple prayers. You can now deploy the Blessings of your deity as listed in Chapter 7: Religion and Belief. Under normal circumstances, you may only ever know one Divine Lore for the Bless Talent.. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Bookish", "You are as at home in a library as a seaman at sea or a farmer a-farming. When using Research, you may reverse the dice of any failed Test if this will score a success. ", new Max(false, -1, "Int"), new Test("Research", ""), 0),
            new Talent("Break and Enter", "You are an expert at quickly breaking down doors and forcing entry. You may add +1 Damage for each level in this Talent when determining damage against inanimate objects such as windows, chests, doors, and similar. ", new Max(false, -1, "S"), new Test("Melee", "when"), 0),
            new Talent("Briber", "You are an exceedingly skilled briber. The GM should reduce the base cost of any required bribe by 10% per level you have in Briber, to a minimum of 10% of the original amount. ", new Max(false, -1, "Fel"), new Test("Bribery", ""), 0),
            new Talent("Cardsharp", "You are used to playing, and winning, at cards, although your methods may involve a little cheating. When you successfully use Gamble or Sleight of Hand when playing cards, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 28 could be used for +8 SL. If you play a real card game to represent what is happening in-game, you may receive an extra number of cards per deal equal to your level in Cardsharp, then discard down to the appropriate hand-size before each round of play. ", new Max(false, -1, "Int"), new Test("Gamble", "and"), 0),
            new Talent("Careful Strike", "You are skilled at hitting your enemy exactly where you want to, either at range or in melee. You may modify your Hit Location result by up to +/–10 per time you have this Talent. So, if you had this Talent twice and hit location 34, the Right Arm, you could modify this down to 14, the Left Arm, or up to 54, the Body (see page 159). ", new Max(false, -1, "I"), new Test("", ""), 0),
            new Talent("Carouser", "You are a seasoned drinker and know how to party hard. You may reverse the dice of any failed Consume Alcohol Test if this will score a Success. ", new Max(false, -1, "T"), new Test("Charm", "at"), 0),
            new Talent("Catfall", "You are nimble and balanced like a cat, and are able to fall much greater distances unharmed than others might. Whenever you fall, you attempt an Athletics Test. If successful, reduce the distance fallen by 1 yard, +1 extra yard per +1 SL scored, for the purposes of calculating Damage. ", new Max(false, -1, "Ag"), new Test("Athletics", "when"), 0),
            new Talent("Cat-tongued", "Like Ranald the Trickster God, you blend truth and lies as if there were no difference. When using Charm to lie, listeners do not get to oppose your Charm with their Intuition to detect if there is something fishy in what you say. ", new Max(false, -1, "Fel"), new Test("Charm", "when"), 0),
            new Talent("Chaos Magic (Nurgle)", "By accident or design you have lost a portion of your soul to the dark god Nurgle, and can now practice the foul magics of Chaos. Your ruinous patron immediately grants you access to a single spell from the Lore of Nurgle and you gain a Corruption point as the spell infiltrates your mind, never to be forgotten. Each time you take this Talent, which always costs 100 XP per time instead of the normal cost, you learn another spell from the Lore of Nurgle and gain a Corruption point. For more about the available spells, see Chapter 8: Magic. Under normal circumstances, you may only ever know one Lore of Chaos Magic. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Chaos Magic (Slaanesh)", "By accident or design you have lost a portion of your soul to the dark god Slaanesh, and can now practice the foul magics of Chaos. Your ruinous patron immediately grants you access to a single spell from the Lore of Slaanesh and you gain a Corruption point as the spell infiltrates your mind, never to be forgotten. Each time you take this Talent, which always costs 100 XP per time instead of the normal cost, you learn another spell from the Lore of Slaanesh and gain a Corruption point. For more about the available spells, see Chapter 8: Magic. Under normal circumstances, you may only ever know one Lore of Chaos Magic. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Chaos Magic (Tzeentch)", "By accident or design you have lost a portion of your soul to the dark god Tzeentch, and can now practice the foul magics of Chaos. Your ruinous patron immediately grants you access to a single spell from the Lore of Tzeentch and you gain a Corruption point as the spell infiltrates your mind, never to be forgotten. Each time you take this Talent, which always costs 100 XP per time instead of the normal cost, you learn another spell from the Lore of Tzeentch and gain a Corruption point. For more about the available spells, see Chapter 8: Magic. Under normal circumstances, you may only ever know one Lore of Chaos Magic. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Combat Aware", "You are used to scanning the battlefield to make snap decisions informed by the shifting tides of war. You may take a Challenging (+0) Perception Test to ignore Surprise, which is modified by circumstance as normal. ", new Max(false, -1, "I"), new Test("Perception", "during"), 0),
            new Talent("Combat Master", "Your accumulated years of combat experience allow you to keep lesser fighters at bay. For each level in this Talent, you count as one more person for the purposes of determining if one side out- IV 134 numbers the other. This Talent only comes into play when you are out-numbered. See page 162 for the rules for out-numbering. ", new Max(false, -1, "Ag"), new Test("", ""), 0),
            new Talent("Combat Reflexes", "You react like a flash of lightning. Add 10 to your Initiative for each level in this Talent when determining Combat Initiative. ", new Max(false, -1, "I"), new Test("", ""), 0),
            new Talent("Commanding Presence", "Your presence fills others with hushed awe and admiration. Such is your aura of authority, those with a lower Status may not resist your Leadership tests with their Willpower. Of course, enemies are still no more likely to respect or obey you, but the common folk rarely stand against you. ", new Max(false, -1, "Fel"), new Test("Leadership", ""), 0),
            new Talent("Concoct", "You are skilled at making potions, philtres, and draughts on the go. You may take one free Crafting Endeavour to use Trade (Apothecary) without need of a Workshop. Other Crafting Endeavours use the normal rules. ", new Max(false, -1, "Int"), new Test("Lore", "(Apothecary)"), 0),
            new Talent("Contortionist", "You can bend and manipulate your body in a myriad of seemingly unnatural ways. This allows you to squeeze through unlikely gaps and bend your body in crazy ways, giving benefits determined by the GM, possibly with a successful Agility test. ", new Max(false, -1, "Ag"), new Test("Perform", "and"), 0),
            new Talent("Coolheaded", "You gain a permanent +5 bonus to your starting Willpower Characteristic this does not count towards your Advances. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Crack the Whip", "You know how to get the most out of your animals. When an animal you control is Fleeing or Running, it gains +1 Movement if you are using a whip. ", new Max(false, -1, "Dex"), new Test("Drive", "or"), 0),
            new Talent("Craftsman (TRADE)", "You have true creative talent. Add the TRADE Skill to any Career you enter. If the TRADE Skill is already in your Career, you may instead purchase the Skill for 5 XP fewer per Advance. ", new Max(false, -1, "Dex"), new Test("Trade", "(any"), 0),
            new Talent("Criminal", "You are an active criminal making money from illegal sources, and you’re not always quiet about it. For the purposes of securing money, either when Earning during play or performing an Income Endeavour, refer to the following table: Career Level Bonus Money per time the Talent is taken 1 +2d10 brass pennies 2 +1d10 silver shillings 3 +2d10 silver shillings 4 +1 gold crown Because of your obvious criminal nature, others consider you lower Status than them unless they also have the Criminal Talent, where Status is compared as normal — perhaps you have gang tattoos, look shifty, or are just rough around the edges, it’s your choice. Because of this, local law enforcers are always suspicious of you and suspect your motivations, which only gets worse the more times you have this Talent, with the exact implications determined by the GM. Lawbreakers without the Criminal Talent earn significantly less coin but are not obviously the sort to be breaking the law, so maintain their Status. With GM consent, you may spend XP to remove levels of the Criminal Talent for the same XP it cost to buy. ", new Max(true, 99, ""), new Test("", ""), 0),
            new Talent("Deadeye Shot", "You always hit an opponent right between the eyes… or wherever else you intended to hit. Instead of reversing the dice to determine which Hit Location is struck with your ranged weapons, you may pick a location. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Dealmaker", "You are a skilled businessman who knows how to close a deal. When using the Haggle skill, you reduce or increase the price of the products by an extra 10%. Note: The GM may put a lower limit on prices here to show a seller refusing to sell below cost. ", new Max(false, -1, "Fel"), new Test("Haggle", ""), 0),
            new Talent("Detect Artefact", "You are able to sense when magic lies within an artefact. You may attempt an Intuition Test for any magical artefact touched. If successful, you sense the item is magical; further, each SL also provides a specific special rule the item uses, if it has any. Normally, you may only attempt this Test once per artefact touched. ", new Max(false, -1, "I"), new Test("Intuition", "tests"), 0),
            new Talent("Diceman", "You are a dicing master, and all claims you cheat are clearly wrong. When you successfully use Gamble or Sleight of Hand when playing with dice, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 06 could be used for +6 SL. If you play any real-life dice games to represent in-game dice games, always roll extra dice equal to your Diceman level and choose the best results. ", new Max(false, -1, "Int"), new Test("Gamble", "and"), 0),
            new Talent("Dirty Fighting", "You have been taught all the dirty tricks of unarmed combat. You may choose to cause an extra +1 Damage for each level in Dirty Fighting with any successful Melee (Brawling) hit. Note: using this Talent will be seen as cheating in any formal bout. ", new Max(false, -1, "WS"), new Test("Melee", "(Brawling)"), 0),
            new Talent("Disarm", "You are able to disarm an opponent with a careful flick of the wrist or a well-aimed blow to the hand. For your Action, you may attempt an Opposed Melee/Melee test. If you win, your opponent loses a held weapon, which flies 1d10 feet in a random direction (with further effects as determined by the GM). If you win by 2 SL, you can determine how far the weapon is flung instead of rolling randomly; if you win by 4 SL, you can also choose the direction the weapon goes in; if you win by 6 SL or more, you can take your opponent’s weapon if you have a free hand, plucking it from the air with a flourish. This Talent is of no use if your opponent has no weapon, or is a larger Size than you (see page 341). ", new Max(false, -1, "I"), new Test("Melee", "Tests"), 0),
            new Talent("Distract", "You are trained in simple movements to distract or startle your opponent, drawing eyes from your true intent. You may use your Move to perform a Distraction. This is resolved by an Opposed Athletics/Cool Test. If you win, your opponent can gain no Advantage until the end of the next Round. ", new Max(false, -1, "Ag"), new Test("Athletics", "to"), 0),
            new Talent("Doomed", "At the age of 10, a Priest of Morr called a Doomsayer took you aside to foretell your death in an incense-laden, coming-of-age ritual called the Dooming. In conjunction with your GM, come up with a suitable Dooming. Should your character die in a fashion that matches your Dooming, your next character gains a bonus of half the total XP your dead character accrued during play. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Drilled", "You have been trained to fight shoulder-to-shoulder with other soldiers. If an enemy causes you to lose Advantage when standing beside an active ally with the Drilled Talent, you may keep 1 lost Advantage for each time you’ve taken the Drilled Talent. ", new Max(false, -1, "WS"), new Test("Melee", "Tests"), 0),
            new Talent("Dual Wielder", "When armed with two weapons, you may attack with both for your Action. Roll to hit with the weapon held in your primary hand. If you hit, determine Damage as normal, but remember to keep your dice roll, as you will use it again. If the first strike hits, once it is resolved, the weapon in your secondary hand can then target an available opponent of your choice using the same dice roll for the first strike, but reversed. So, if you rolled 34 to hit with the first weapon, you use 43 to hit with the second. Remember to modify this second roll by your off-hand penalty (–20 unless you have the Ambidextrous Talent). This second attack is Opposed with a new defending roll, and damage for this second strike is calculated as normal. The only exception to this is if you roll a Critical for your first strike. If this happens, use the roll on the Critical Table to also act as the roll for the second attack. So, if you scored a critical to the head and rolled 56 on the Critical table for a Major Eye Wound, your second attack would then strike out with a to-hit value of 56. If you choose to attack with both weapons, all your defensive rolls until the start of your next Turn suffer a penalty of –10. You do not gain an Advantage when you successfully strike or Wound an opponent when Dual Wielding unless both attacks hit. ", new Max(false, -1, "Ag"), new Test("Melee", "or"), 0),
            new Talent("Embezzle", "You are skilled at skimming money from your employers without being detected. Whenever you secure money when Earning (during play or performing an Income Endeavour), you may attempt an Opposed Intelligence Test with your employer (assuming you have one). If you win, you skim 2d10 + SL brass pennies, 1d10 + SL silver shillings, or 1 + SL gold crowns (depending upon the size of the business in question, as determined by the GM) without being detected. If your employer wins by 6+ SL, you gain the money, but your embezzling is detected; what then happens is left to the GM. Any other result means you have failed to embezzle any money. ", new Max(false, -1, "Int"), new Test("Intelligence", "(Embezzling)"), 0),
            new Talent("Enclosed Fighter", "You have learned to make the most benefit out of fighting in enclosed spaces. You ignore penalties to Melee caused by confined spaces such as tunnels, the frontline, small fighting pits, and similar, and can use the Dodge Skill, even if it would normally be disallowed due to lack of space. ", new Max(false, -1, "Ag"), new Test("Dodge", "in"), 0),
            new Talent("Etiquette (GROUP)", "You can blend in socially with GROUP so long as you are dressed and acting appropriately. If you do not have the Talent, those with it will note your discomfort in the unfamiliar environment. This is primarily a matter for roleplaying, but may confer a bonus to Fellowship Tests at the GM’s discretion. ", new Max(false, -1, "Fel"), new Test("Charm", "and"), 0),
            new Talent("Fast Hands", "You can move your hands with surprising dexterity. Bystanders get no passive Perception Tests to spot your use of the Sleight of Hand Skill, instead they only get to Oppose your Sleight of Hand Tests if they actively suspect and are looking for your movements. Further, attempts to use Melee (Brawling) to simply touch an opponent gain a bonus of +10 × your level in Fast Hands. ", new Max(false, -1, "Dex"), new Test("Sleight", "of"), 0),
            new Talent("Fast Shot", "If you have a loaded ranged weapon, you can fire it outside the normal Initiative Order before any other combatant reacts in the following Round. You roll to hit using all the normal modifiers. Employing Fast Shot requires both your Action and Move for your upcoming turn, and these will count as having been spent when your next turn arrives. If two or more characters use Fast Shot, the character who has taken this Talent most goes first. If any characters have taken Fast Shot an equal number of times, both shots are fired simultaneously, and should both be handled at the same time. ", new Max(false, -1, "Ag"), new Test("Ranged", "when"), 0),
            new Talent("Fearless (ENEMY)", "You are either brave enough or crazy enough that fear of ENEMY has become a distant memory. With a single Average (+20%) Cool Test, you may ignore any Intimidate, Fear, or Terror effects from ENEMY when encountered.", new Max(false, -1, "WP"), new Test("Cool", "to"), 0),
            new Talent("Feint", "You have trained how to make false attacks in close combat to fool your opponent. You may now make a Feint for your Action against any opponent using a weapon. This is resolved with an Opposed Melee (Fencing)/Melee Test. If you win, and you attack the same opponent before the end of the next Round, you may add the SL of your Feint to your attack roll. ", new Max(false, -1, "WS"), new Test("Melee", "(Fencing)"), 0),
            new Talent("Field Dressing", "You are used to treating wounds quickly. If you fail a Heal Test when using Bandages, you may reverse the result if this will score a success; however, if you do so, you may not score more than +1 SL as you focus on speed over accuracy. ", new Max(false, -1, "Int"), new Test("Heal", "during"), 0),
            new Talent("Fisherman", "You are a very capable fisherman and know all the best ways to land fish. Assuming a large enough body of water is available, you are automatically assumed to be able to fish enough to feed yourself and a number of others equal to your level in Fisherman, assuming you choose to spend at least an hour or so with a line and bait. You may secure more fish in addition to this using the normal rules for foraging (see page 127). ", new Max(false, -1, "I"), new Test("Any", "Test"), 0),
            new Talent("Flagellant", "You have dedicated your pain to the service of your God. Each day, you must spend half a bell (half an hour) praying as you maintain a number of Wounds suffered equal to your level in Flagellent. Until you next sleep, if you have the Frenzy Talent you may enter Frenzy immediately without testing. The Frenzy Talent is added to the Talent list of any career you are in. Should you fail to flagellate yourself on any given day, or allow your castigated flesh to be healed, you may not spend any Resilience or Resolve until you flagellate yourself again. ", new Max(false, -1, "T"), new Test("Any", "for"), 0),
            new Talent("Flee!", "When your life is on the line you are capable of impressive bursts of speed. Your Movement Attribute counts as 1 higher when Fleeing (see page 165). ", new Max(false, -1, "Ag"), new Test("Athletics", "when"), 0),
            new Talent("Fleet Footed", "You gain +1 to your Movement Attribute. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Frenzy", "You can Frenzy as described on page 190. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Frightening", "Anyone sane thinks twice before approaching you. If you wish, you have a Fear Rating of 1 (see page 190). Add +1 to this number per extra time you have this Talent. ", new Max(false, -1, "S"), new Test("", ""), 0),
            new Talent("Furious Assault", "Your blows follow one another in quick succession, raining down on your opponents with the fury of Ulric. Once per Round, if you hit an opponent in close combat, you may immediately spend an Advantage or your Move to make an extra attack (assuming you have your Move remaining). ", new Max(false, -1, "Ag"), new Test("Melee", "when"), 0),
            new Talent("Gregarious", "You just like talking to other folk and it seems they like talking to you. You may reverse any failed Gossip Test if this allows the Test to succeed. ", new Max(false, -1, "Fel"), new Test("Gossip", "Tests"), 0),
            new Talent("Gunner", "You can reload blackpowder weapons with practiced ease. Add SL equal to your level in Gunner to any Extended Test to reload a Blackpowder weapon. ", new Max(false, -1, "Dex"), new Test("", ""), 0),
            new Talent("Hardy", "You gain a permanent addition to your Wounds, equal to your Toughness Bonus. If your Toughness Bonus should increase, then the number of Wounds Hardy provides also increases. ", new Max(false, -1, "T"), new Test("", ""), 0),
            new Talent("Hatred (GROUP)", "You are consumed with hatred for GROUP, as described on page 190. Each time you take this Talent you develop hatred for a new group.", new Max(false, -1, "WP"), new Test("Willpower", "(Resist"), 0),
            new Talent("Holy Hatred", "Your prayers drip with the hatred you feel for your blasphemous enemies. You deal +1 Damage with Miracles for each level in this Talent. ", new Max(false, -1, "Fel"), new Test("", ""), 0),
            new Talent("Holy Visions", "You clearly see the great works of the Gods all around you. You automatically know when you enter Holy Ground, and may take an Intuition Test to receive visions (often obscure, and seen through the paradigm of your cult or individual belief-system) regarding the local area if significant events have occurred there in the past. ", new Max(false, -1, "I"), new Test("Intuition", "Tests"), 0),
            new Talent("Hunter’s Eye", "You are a skilled hunter and know all the best techniques to find game. When travelling through well-stocked lands, you are automatically assumed to be able to hunt down enough game to feed yourself and a number of others equal to your level in Hunter’s Eye, so long as you have time and the correct equipment. You may secure more food in addition to this using the normal rules for foraging (see page 127). ", new Max(false, -1, "I"), new Test("Any", "Test"), 0),
            new Talent("Impassioned Zeal", "When you talk about your cause, case, or religion, your words fill with passion and fervent zeal. You may double your Fellowship for the purposes of determining the number of people influenced by your Public Speaker (see page 142) when talking about your cause. ", new Max(false, -1, "Fel"), new Test("Charm", "when"), 0),
            new Talent("Implacable", "It takes a lot to finish you off. You can ignore the Wound loss from a Bleeding Condition. Each level in this Talent lets you ignore the Wound loss from an extra Bleeding Condition. ", new Max(false, -1, "T"), new Test("", ""), 0),
            new Talent("In-fighter", "You are skilled at drawing in close to an opponent. You suffer no penalties for fighting against an opponent with a longer weapon than you. Further, if you use the optional rules for In-fighting (see page 297), gain a bonus of +10 to hit your opponent. ", new Max(false, -1, "Dex"), new Test("Melee", "when"), 0),
            new Talent("Inspiring", "Your rousing words and pleas can turn the tide of a battle. Refer to the following table to see how many people you can now influence with your Leadership Skill (see page 126) when at war. Talent Taken Number of soldiers influenced 1 As normal × 5 2 As normal × 10 3 As normal × 20 4 As normal × 50 5 As normal × 100 6 As normal × 200 7 As normal × 500 8 As normal × 1000 9 All who can hear your inspiring voice Example: Abbess Birgitte van der Hoogenband’s monastery is under attack by Greenskins, and things are going badly. So, she decides to bolster her soldiers’ spirits with a Leadership Test, granting them +10 to all Psychology Tests. Her Leadership Test scores 3 SL. Given she has a Fellowship Bonus of 6, and she can influence her Fellowship Bonus + SL of her soldiers using Leadership, she bolsters 9 soldiers. However, as she has Inspiring 3, that number is multiplied by 20, meaning 180 of her soldiers take heart from her screamed encouragement to, ‘HOLD THE LINE!’ ", new Max(false, -1, "Fel"), new Test("Leadership", "during"), 0),
            new Talent("Instinctive Diction", "You instinctively understand the language of Magick, and are capable of articulating the most complex phrases rapidly without error. You do not suffer a Miscast if you roll a double on a successful Language (Magick) Test. ", new Max(false, -1, "I"), new Test("Language", "(Magick)"), 0),
            new Talent("Invoke (Divine Lore)", "You are blessed by one of the Gods and can empower one of your Cult’s Miracles. Further, you may purchase extra miracles for 100 XP per miracle you currently know. So, if you already know 3 miracles, your next miracle costs 300 XP to purchase. Full rules for learning new miracles are provided in Chapter 7: Religion and Belief. Under normal circumstances, you may not learn more than one Invoke (Divine Lore) Talent. Further, you may not learn the Petty Magic or Arcane Magic Talents when you have the Invoke Talent. You can unlearn this Talent for 100 XP, but will lose all of your miracles if you do so, and will also garner the extreme disfavour of your God, with effects determined by your GM. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Iron Jaw", "You are made of sturdy stuff and can weather even the strongest blows. Whenever you gain one or more Stunned Conditions, you may make an immediate Challenging (+0) Endurance Test to not take one of them, with each SL removing an extra Stunned Condition. ", new Max(false, -1, "T"), new Test("Endurance", "tests"), 0),
            new Talent("Iron Will", "You have an indomitable will of iron, and will never willingly bow down before another. Use of the Intimidate skill does not cause Fear in you, and will not stop you speaking out against the intimidating party. ", new Max(false, -1, "WP"), new Test("Cool", "Tests"), 0),
            new Talent("Jump Up", "You are hard to keep down. You may perform a Challenging (+0) Agility Test to immediately regain your feet whenever you gain a Prone Condition. This Athletics Test is often modified by the Strength behind the blow that knocks you down: for every +10 Strength the blow has over your Toughness, you suffer a penalty of –10 to the Athletics Test, and vice versa . ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Kingpin", "You have earned an air of respectability despite your nefarious ways. You may ignore the Status loss of the Criminal Talent. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Lightning Reflexes", "You gain a permanent +5 bonus to your starting Agility Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Linguistics", "You have a natural affinity for languages. Given a month’s exposure to any Language, you count the associated Language Skill as a Basic Skill with a successful Intelligence Test (which can be attempted once per month). Note: Linguistics only works for languages used to frequently communicate with others, so does not work with Language (Magick). ", new Max(false, -1, "Int"), new Test("Language", "(All)"), 0),
            new Talent("Lip Reading", "You can tell what people are saying by simply watching their lips; you do not need to hear what they are saying. If you have an unobstructed view of the speaker’s lower face, you can attempt a Perception Test to understand what they are saying. ", new Max(false, -1, "I"), new Test("Perception", "Tests"), 0),
            new Talent("Luck", "They say when you were born, Ranald smiled. Your maximum Fortune Points now equal your current Fate points plus the number of times you’ve taken Luck. ", new Max(false, -1, "Fel"), new Test("", ""), 0),
            new Talent("Magical Sense", "You are able to sense the Winds of Magic in others. You may attempt an Average (+20) Intuition Test whenever you encounter a spellcaster. If you pass, you sense the target is a witch. Further, if you score an Astounding Success (+6), can also determine the target’s highest Channelling Specialisation. ", new Max(false, -1, "I"), new Test("Intuition", "Tests"), 0),
            new Talent("Magic Resistance", "You are resistant to magic. You must Oppose any incoming spell with your Willpower, just as if you were a spellcaster using Language (Magick) to dispel (see page 237). Further, you may never learn the Arcane Magic, Bless, Invoke, Petty Magic, or Witch! Talents. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Magnum Opus", "You are an undisputed master in your field, able to create work of such incredible complexity others can but sit back and marvel at your genius. Each time you take this Talent you may create a single, extraordinary work of art with one of your Art or Trade Skills. This work is unrivalled in your field, a unique piece that will always impress, giving bonuses as determined by the GM, most commonly to Fellowship Tests from those who have witnessed your astounding work. Selling the piece will net you at least ten times its normal value, and sometimes significantly more than this. ", new Max(true, 99, ""), new Test("", ""), 0),
            new Talent("Marksman", "You gain a permanent +5 bonus to your starting Ballistic Skill (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Master of Disguise", "You are an expert at taking on the appearance and mannerisms of others. With nothing but posture changes, face twisting, and careful use of appropriate clothing, you no longer look like yourself without having to use a Disguise Kit. ", new Max(false, -1, "Fel"), new Test("Entertain", "(Acting)"), 0),
            new Talent("Master Orator", "You are skilled at firing up crowds. You gain a gain a SL bonus equal to your levels of Master Orator to any Charm Test when Public Speaker before a crowd. ", new Max(false, -1, "Fel"), new Test("", ""), 0),
            new Talent("Master Tradesman (TRADE)", "You are exceptionally skilled at your specified Trade (TRADE) skill. You reduce the required SL of any Extended Test using your Trade (TRADE) Skill by the level of your Master Tradesman Talent. ", new Max(false, -1, "Dex"), new Test("Any", "appropriate"), 0),
            new Talent("Menacing", "You have an imposing presence. When using the Intimidate Skill, gain a SL bonus equal to your levels of Menacing. ", new Max(false, -1, "S"), new Test("Intimidate", ""), 0),
            new Talent("Mimic", "You have a good ear for accents and dialects, and can reproduce them accurately. You may replicate any accent you are exposed to for at least a day with an Initiative Test; this Test may be attempted once per day. Once passed, you may always mimic the accent, and locals will believe you to be one of their own. ", new Max(false, -1, "I"), new Test("Entertain", "(Acting)"), 0),
            new Talent("Night Vision", "You can see very well in natural darkness. Assuming you have at least a faint source of light (such as starlight, moonlight, or bioluminescence) you can see clearly for 20 yards per level of Night Vision. Further, you can extend the effective illumination distance of any light sources by 20 yards per level of Night Vision. ", new Max(false, -1, "I"), new Test("Perception", "tests"), 0),
            new Talent("Nimble Fingered", "You gain a permanent +5 bonus to your starting Dexterity (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Noble Blood", "You are either born into the nobility, or otherwise elevated to it by in-game events. Assuming you are dressed appropriately, you are always considered of higher Status than others unless they also have the Noble Blood Talent, where Status is compared as normal. ", new Max(true, 1, ""), new Test("Any", "Test"), 0),
            new Talent("Nose for Trouble", "You are used to getting into, and preferably out of, trouble. You may attempt an Intuition Test to spot those seeking to cause trouble or seeking to cause you harm, even if normally you would not be allowed a Test (because of Talents or a Spell, for example). This Test will likely be Opposed if others are hiding, and the GM may prefer to take this Test on your behalf in secret so you do not know the results should you fail. If any troublemakers you spot start combat, you may ignore any Surprised Condition they would normally inflict. ", new Max(false, -1, "I"), new Test("Any", "Test"), 0),
            new Talent("Numismatics", "You are well versed with the different coinage of the Old World, and are adept at determining their value. You can judge the true value of a coin by experience alone, not even requiring a Test. Further, you can identify forged coins with a Simple Evaluate Test; it is never Opposed by the SL of the Forger. ", new Max(false, -1, "I"), new Test("Evaluate", "to"), 0),
            new Talent("Old Salt", "You are an experienced seaman, and are very used to sea life. You can ignore all negative modifiers to Tests at sea derived from poor weather, rolling ships, and similar. Further, you count as two seamen towards the minimum number of crew to pilot a sea-going vessel. ", new Max(false, -1, "Ag"), new Test("Sail", "(any"), 0),
            new Talent("Orientation", "You have an instinctual feel for direction. You automatically know which direction is north with a glimpse at the stars, trees, or whatever other signs you are familiar with. ", new Max(false, -1, "I"), new Test("Navigation", ""), 0),
            new Talent("Panhandle", "You are a skilled beggar, able to get even the most jaded individual to contribute to your cause. You can perform a Charm Test every half hour when Begging, not every hour (see page 120). ", new Max(false, -1, "Fel"), new Test("Charm", "(Begging)"), 0),
            new Talent("Perfect Pitch", "Elthárin, Cathayan, and Magick) You have perfect pitch, able to replicate notes perfectly and identify them without even making a Test. Further, add Entertain (Sing) to any Career you enter; if it is already in your Career, you may instead purchase the Skill for 5 XP fewer per Advance. ", new Max(false, -1, "I"), new Test("Entertain", "(Sing),"), 0),
            new Talent("Petty Magic", "You have the spark to cast magic within you and have mastered techniques to control it at a basic level. When you take this Talent, you manifest, and permanently memorise, a number of spells equal to your Willpower Bonus. You can learn extra Petty spells for the following cost in XP. No. of Petty Spells Currently Known XP Cost for a new spell Willpower Bonus × 1 50 XP Willpower Bonus × 2 100 XP Willpower Bonus × 3 150 XP Willpower Bonus × 4 200 XP ...and so on. So, if your Willpower Bonus is 3, it will cost you 50 XP for the first 3 spells, then 100 XP for the next 3, and so on. Full rules for learning new spells are provided in Chapter 8: Magic. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Pharmacist", "You are highly skilled at pharmacy, better able than most to make pills, ointments, unguents, oils, creams, and more. You may reverse any failed Trade (Apothecary) test if this allows the Test to succeed. ", new Max(false, -1, "Int"), new Test("Trade", "(Apothecary)"), 0),
            new Talent("Pilot", "You are skilled at leading vessels through dangerous waters. If you fail a Test to pass through dangerous waters, you may reverse the result if it will score a success; however, if you do so, you may not score more than +1 SL as you catch the incoming danger at the last moment. ", new Max(false, -1, "I"), new Test("Row", "or"), 0),
            new Talent("Public Speaker", "You are a skilled orator and know how to work large groups of people. Refer to the following table to see how many people you can now influence with your Charm Skill (see page 120) when Public Speaker. Talent Taken Number influenced 1 As normal × 5 2 As normal × 10 3 As normal × 20 4 As normal × 50 5 As normal × 100 6 As normal × 200 7 As normal × 500 8 As normal × 1000 9 All who can hear your golden voice ", new Max(false, -1, "Fel"), new Test("", ""), 0),
            new Talent("Pure Soul", "Your soul is pure, quite resistant to the depredations of Chaos. You may gain extra Corruption points equal to your level of Pure Soul before having to Test to see if you become corrupt. ", new Max(false, -1, "WP"), new Test("", ""), 0),
            new Talent("Rapid Reload", "You can reload ranged weapons with practiced ease. You add SL equal to your level in Rapid Reload to any Test to reload a ranged weapon. ", new Max(false, -1, "Dex"), new Test("", ""), 0),
            new Talent("Reaction Strike", "Your fast reactions have allowed you to fell many opponents before they have even swung their blades. When you are Charged, you may attempt a Challenging (+0) Initiative Test to gain an immediate Free Attack outside the normal turn sequence. This attack is resolved with whatever weapon you are carrying in your primary hand. You may make as many Reaction Strikes in a Round as you have levels in this Talent, but can only attack each individual charger once each. ", new Max(false, -1, "I"), new Test("Initiative", "Tests"), 0),
            new Talent("Read/Write", "You are one of the rare literate individuals in the Old World. You are assumed to be able to read and write (if appropriate) all of the Languages you can speak. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Relentless", "When you have your mind set on a target, there is nothing anyone can do to stop you reaching them. If you use Advantage when Disengaging, you may keep a number of Advantage equal to your level of Relentless. Further, you may use Advantage to Disengage even if you have lower Advantage than your opponents. ", new Max(false, -1, "Ag"), new Test("", ""), 0),
            new Talent("Resistance (THREAT)", "Your strong constitution allows you to more readily survive THREAT. You may automatically pass the first Test to resist THREAT, every session. If SL is important, use your Toughness Bonus as SL for the Test. ", new Max(false, -1, "T"), new Test("All", "those"), 0),
            new Talent("Resolute", "You launch into attacks with grim determination. Add your level of Resolute to your Strength Bonus when you Charge. ", new Max(false, -1, "S"), new Test("", ""), 0),
            new Talent("Reversal", "You are used to desperate combats, able to turn even the direst circumstances to your Advantage. If you win an Opposed Melee Test, instead of gaining +1 Advantage, you may take all your opponent’s Current Advantage. If you do this, you do not cause any Damage, even if it is your Turn in the Round. ", new Max(false, -1, "WS"), new Test("Melee", "when"), 0),
            new Talent("Riposte", "Conforming to ‘the best defence is offence’, you respond to an incoming attack with a lightning-fast counterstrike of your own. If your weapon has the Fast quality, you may cause Damage when you are attacked, just as if it was your Action. You can Riposte a number of attacks per round equal to your Riposte level. ", new Max(false, -1, "Ag"), new Test("Melee", "when"), 0),
            new Talent("River Guide", "You know all the tricks for navigating dangerous rivers. You don’t need to Test for passing through dangerous stretches of water until the Difficulty for doing so is –10 or lower — you automatically pass all Tests easier than this. Further, if you have the appropriate Lore (Local) Skill, you need never Test for navigating dangerous waters — you are assumed to know the route through. ", new Max(false, -1, "I"), new Test("Any", "Lore"), 0),
            new Talent("Robust", "You are as tough as old boots and just soak up damage. You reduce all incoming Damage by an extra +1 per time you have taken the Robust Talent, even if the Damage cannot normally be reduced, but still suffer a minimum of 1 Wound from any Damage source. ", new Max(false, -1, "T"), new Test("", ""), 0),
            new Talent("Roughrider", "You are at home in the saddle in even the most difficult of circumstances, and know how to get the best out of your mount during conflict. Assuming you have the Ride skill, you can direct your mount to take an Action, not just a Move, without a Ride test. ", new Max(false, -1, "Ag"), new Test("Ride", "(Horse)"), 0),
            new Talent("Rover", "You are at home roaming the wild places. When using Stealth in a rural environment, bystanders do not get passive Perception Tests to detect you; they can only spot you if they are specifically on look-out, or watching for hidden spies. ", new Max(false, -1, "Ag"), new Test("Stealth", "Tests"), 0),
            new Talent("Savant (LORE)", "You are exceptionally learned, and have a significant degree of specialised knowledge in a single field of study. You automatically know a number of pieces of correct information equal to you Savant level about a relevant issue without having to test your LORE Skill. Testing, as always, will provide yet more information as normal as determined by the GM. ", new Max(false, -1, "Int"), new Test("Lore", "(chosen"), 0),
            new Talent("Savvy", "You gain a permanent +5 bonus to your starting Intelligence Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Scale Sheer Surface", "You are an exceptional climber. You can attempt to climb even seemingly impossible surfaces such as sheer fortifications, ice shelves, plastered walls, and similar, and you ignore any penalties to Climb Tests derived from the difficulty of the surface climbed. ", new Max(false, -1, "S"), new Test("Climb", ""), 0),
            new Talent("Schemer", "You are a master of politics and see conspiracy around every corner. Once per session, you may ask the GM one question regarding a political situation or entangled web of social connections; the GM will perform a secret Intelligence Test and provide you some observations regarding the situation based upon your SL. ", new Max(false, -1, "Int"), new Test("Intelligence", "Tests"), 0),
            new Talent("Sea Legs", "You are used to the rolling motion of the oceans, and are very unlikely to get sea sick, even in the worst storms. Under normal conditions at sea, you need never Test to see if you become Sea Sick. At other times (such as a storm, or a magically induced bout of Sea Sickness), you can ignore any penalties to Tests to avoid Sea Sickness. ", new Max(false, -1, "T"), new Test("All", "those"), 0),
            new Talent("Seasoned Traveller", "You are an inquisitive soul who has travelled far and wide, learning all manner of local information. Add Lore (Local) to any Career you enter; if it is already in Career, you may purchase the Skill, both times — a different Speciality each time, such as Altdorf, Vorbergland, or Ubersreik — for 5 XP fewer per Advance. ", new Max(false, -1, "Int"), new Test("Any", "Lore"), 0),
            new Talent("Second Sight", "You can perceive the shifting Winds of Magic that course from the Chaos Gates at the poles of the world. You now have the Sight (see page 233). ", new Max(false, -1, "I"), new Test("Any", "Test"), 0),
            new Talent("Secret Identity", "You maintain a secret identity that allows you to appear richer, or perhaps poorer, than you actually are. With GM permission, choose any one Career. As long as you are dressed appropriately, you may use the Social Status of the chosen Career you masquerade as rather than your own for modifying Fellowship Tests, and can even ignore the Criminal Talent. However, maintaining this identity will require Entertain (Acting) rolls when you encounter those who may recognise your falsehood. You may create a new Secret Identity for each level you have in this Talent. ", new Max(false, -1, "Int"), new Test("Entertain", "(Acting)"), 0),
            new Talent("Shadow", "You are skilled at following people without being spotted. You may use the Shadowing rules on page 130 without doing a Combined Test. Instead you test against just your Perception or your Stealth Skill, whichever is higher. ", new Max(false, -1, "Ag"), new Test("Any", "Test"), 0),
            new Talent("Sharp", "You gain a permanent +5 bonus to your starting Initiative Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Sharpshooter", "You can make aimed shots of exceptional accuracy. You ignore any negative Difficulty modifiers to Ranged Tests due to the size of your target. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Shieldsman", "You are skilled at using your shield to manoeuvre others in combat so you can take advantage of a desperate situation. When using a Shield to defend, you gain Advantage equal to the number of levels you have in Shieldsman if you lose the Opposed Test. ", new Max(false, -1, "S"), new Test("Any", "Test"), 0),
            new Talent("Sixth Sense", "You get a strange feeling when you are threatened, and can react accordingly. The GM may warn you if you are walking into danger; this will normally come after a secret Intuition Test on your behalf. Further, you may ignore Surprise if you pass an Intuition Test. ", new Max(false, -1, "I"), new Test("Intuition", "Tests"), 0),
            new Talent("Slayer", "When determining Damage use your opponent’s Toughness Bonus as your Strength Bonus if it is higher; always determine this before any other rules modify your Strength or Strength Bonus. Further, if your target is larger than you, and your score a Critical (see page 159), multiply all melee Damage you cause by the number of steps larger your target is (so, 2 steps = ×2, 3 steps = ×3, and so on); this multiplication is calculated after all modifiers are applied. See page 341 for more about Size . ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Small", "You are much shorter than most folk in the Old World. The full rules for different Sizes are found in Chapter 12: Bestiary on page 341. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Sniper", "Distance is of no import to your shooting skills, and you are just as adept at picking off far away targets as those nearby. You suffer no penalties for shooting at Long range, and half the penalties for Extreme range. ", new Max(true, 4, ""), new Test("Ranged", "(Long–Extreme"), 0),
            new Talent("Speedreader", "important You read books at a voracious pace. You may reverse a failed Research Test (make singular if previous suggestion is taken) if this will grant success. If the speed at which you read is important during combat, a successful Language Test lets you read and fully comprehend a number of pages per Round equal to your SL plus Speedreader level (minimum of 1, even if you fail the Test). ", new Max(false, -1, "Int"), new Test("Research", "and"), 0),
            new Talent("Sprinter", "You are a swift runner. Your Movement Attribute counts as 1 higher when Running. ", new Max(false, -1, "S"), new Test("Athletics", "Tests"), 0),
            new Talent("Step Aside", "You are skilled at being where enemy weapons are not. If you use Dodge to defend against an incoming attack and win the Opposed Test, you may move up to 2 yards as you dive away, and no longer count as Engaged. None of your opponents will gain a Free Attack when you do this. ", new Max(false, -1, "Ag"), new Test("Dodge", "Tests"), 0),
            new Talent("Stone Soup", "You are used to getting by with less, and know how to survive lean times. You can subsist on half the amount of food required without any negative penalties (bar feeling really hungry), and need only test for Starvation every 3 days, not 2 (see page 181). ", new Max(false, -1, "T"), new Test("Endurance", "Tests"), 0),
            new Talent("Stout-hearted", "No matter how bad things get, you always seem to come back for more. You may attempt a Cool Test to remove a Broken Condition at the end of each of your Turns as well as at the end of the Round (see page 168 for more on this). ", new Max(false, -1, "WP"), new Test("Cool", "Tests"), 0),
            new Talent("Strider (TERRAIN)", "You are experienced in traversing TERRAIN. You ignore all movement penalties when crossing over or through TERRAIN.", new Max(false, -1, "Ag"), new Test("Athletics", "Tests"), 0),
            new Talent("Strike Mighty Blow", "You know how to hit hard! You deal your level of Strike Mighty Blow in extra Damage with melee weapons. ", new Max(false, -1, "S"), new Test("", ""), 0),
            new Talent("Strike to Injure", "You are an expert at striking your enemies most vulnerable areas. You inflict your level of Strike to Injure in additional Wounds when you cause a Critical Wound. ", new Max(false, -1, "I"), new Test("", ""), 0),
            new Talent("Strike to Stun", "You know where to hit an opponent to bring him down fast. You ignore the ‘Called Shot’ penalty to strike the Head Hit Location when using a melee weapon with the Pummel Quality (see page 298). Further, you count all improvised weapons as having the Pummel Quality. ", new Max(false, -1, "WS"), new Test("Melee", "Tests"), 0),
            new Talent("Strong Back", "You have a strong back that is used to hard work. You may add your levels in Strong Back to your SL in any Opposed Strength Tests, and can carry additional Encumbrance points of trappings (see page 293) equal to your level of Strong Back. ", new Max(false, -1, "S"), new Test("Row", "and"), 0),
            new Talent("Strong Legs", "You have strong legs able to carry you great distances when you jump. Add your Strong Legs level to your SL in any Athletics Tests involving Leaping (see page 166). ", new Max(false, -1, "S"), new Test("", ""), 0),
            new Talent("Strong-minded", "You are the epitome of determination and resolve. Add your level in Strong Minded to your maximum Resolve pool. ", new Max(false, -1, "WP"), new Test("", ""), 0),
            new Talent("Strong Swimmer", "You are an especially strong swimmer and used to holding your breath for a long time underwater. Gain a bonus of your level in Strong Swimmer to your Toughness Bonus for the purposes of holding your breath. ", new Max(false, -1, "S"), new Test("Swim", ""), 0),
            new Talent("Sturdy", "You have a brawny physique, or are very used to carrying things. Increase the number of Encumbrance Points you can carry by your Sturdy level x 2. ", new Max(false, -1, "S"), new Test("Strength", "Tests"), 0),
            new Talent("Suave", "You gain a permanent +5 bonus to your starting Fellowship Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Super Numerate", "You have a gift for calculation and can work out the solution to most mathematical problems with ease. You may use a simple calculator to represent what your PC is capable of mentally computing. ", new Max(false, -1, "Int"), new Test("Evaluate,", "Gamble"), 0),
            new Talent("Supportive", "You know what to say and when to make the most impact upon your superiors. When you successfully use a social Skill to influence those with a higher Status tier, you can choose to either use your rolled SL, or the number rolled on your units die. So, a successful roll of 46 could be used for +6 SL. ", new Max(false, -1, "Fel"), new Test("Social", "Tests"), 0),
            new Talent("Sure Shot", "You know how to find the weak spots in a target’s armour. When you hit a target with a Ranged weapon, you may ignore Armour Points equal to your Sure Shot level. ", new Max(false, -1, "I"), new Test("", ""), 0),
            new Talent("Surgery", "time to do it ‘properly’ You are a surgeon, able to open and close the flesh in order to heal others. You can treat any Critical Wound marked as needing Surgery. You can also perform surgery to resolve internal issues with an Extended Challenging (+0) Heal Test with a target SL determined by the GM (usually 5–10) depending upon the difficulty of the procedure at hand. This will cause 1d10 Wounds and 1 Bleeding Condition per Test, meaning surgery has a high chance of killing a patient if the surgeon is not careful. After surgery, the patient must pass an Average (+20) Endurance Test or gain a Minor Infection (see page 187). ", new Max(false, -1, "Int"), new Test("Heal", "Tests"), 0),
            new Talent("Tenacious", "You never give up, no matter how impossible your travails appear. You can double the length of time successful Endurance Tests allow you to endure a hardship. This includes enduring prolonged riding, exposure, rituals, and similar adversities. ", new Max(false, -1, "T"), new Test("Endurance", "Tests"), 0),
            new Talent("Tinker", "You are somewhat of a Johann-of-all-trades, able to repair almost anything. You count all non-magical Trade Skills as Basic when repairing broken items. ", new Max(false, -1, "Dex"), new Test("Trade", "Tests"), 0),
            new Talent("Tower of Memories", "A recollection technique first instigated by the Cult of Verena, reputedly from Elven practices taught by the Loremasters of Hoeth, Tower of Memories allows you to perfectly recall a sequence of facts by storing them in an imaginary spire. You can recall a sequence as long as your Intelligence without having to make a Test. For every 10 more items you attempt to memorise, you must make an increasingly difficult Intelligence Test to recall the list correctly, starting at Very Easy (+60) for +10, Easy (+40) for +20, Average (+0) for +30, and so on. Beyond it’s obvious utility for Gamble Tests, where having this Talent adds a bonus of +20 to +60 depending upon how useful recalling sequences is to the game at hand, the GM can apply bonuses to other Tests as appropriate. Each time you take this Talent you may recall an extra sequence without having to forget a previously stored one. ", new Max(false, -1, "Int"), new Test("", ""), 0),
            new Talent("Trapper", "You are skilled at spotting and using traps. You may take a Perception Test to spot traps automatically without having to tell the GM of your intention; the GM may prefer to make some of these Tests on your behalf in private. ", new Max(false, -1, "I"), new Test("Perception", "Tests"), 0),
            new Talent("Trick Riding", "You are capable of amazing feats of agility on horseback. You can use any of your Performer Skills and unmodified Dodge skill when on horseback. Further, when mounted, you can make your Move at the start of the Round instead of on your Turn. ", new Max(false, -1, "Ag"), new Test("Dodge", "Tests"), 0),
            new Talent("Tunnel Rat", "You are at home in tunnels, sewers, and other underground environments. When using Stealth in an underground environment, bystanders do not get passive Perception Tests to detect you; they can only spot you if they are specifically on look-out, or watching for hidden others. ", new Max(false, -1, "Ag"), new Test("Stealth", "Tests"), 0),
            new Talent("Unshakeable", "You are a jaded veteran who has survived more than one hail of shots from Blackpowder weapons. You need only take a Cool Test to resist a Broken Condition if you are successfully wounded by a Blackpowder weapon, not just if you are shot at. ", new Max(false, -1, "WP"), new Test("Cool", "Tests"), 0),
            new Talent("Very Resilient", "You gain a permanent +5 bonus to your starting Toughness Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Very Strong", "You gain a permanent +5 bonus to your starting Strength Characteristic (this does not count towards your Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("War Leader", "Skills: Leadership Tests during War Your stern gaze and inspiring words motivate your soldiers to fight on to the end. All subordinates able to see you may add your level in War Leader to their SL in one Willpower Test per Round. This bonus does not stack. ", new Max(false, -1, "Fel"), new Test("", ""), 0),
            new Talent("War Wizard", "You are trained to cast magic while in the thick of combat. On your Turn, you may cast one Spell with a Casting Number of 5 or less for free without using your Action. However, if you do this, you may not cast another spell this Turn. ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Warrior Born", "You gain a permanent +5 bonus to your starting Weapon Skill Characteristic (doesn’t count as Advances). ", new Max(true, 1, ""), new Test("", ""), 0),
            new Talent("Waterman", "You are an experienced freshwater sailor and are well-versed with river vessels. You can ignore all negatives to your Tests when onboard a barge derived from rolling waters, swaying vessels, unsure footing, and similar. Further, you count as two boatmen towards the minimum number of crew to pilot a river vessel. ", new Max(false, -1, "Ag"), new Test("Sail", "Tests"), 0),
            new Talent("Wealthy", "You are fabulously wealthy, and are rarely ever short of coin. When Earning (including Income Endeavours) you secure +1 GC per time you have this Talent. ", new Max(true, 99, ""), new Test("", ""), 0),
            new Talent("Well-prepared", "You are used to anticipating the needs of others, and yourself. A number of times per session equal to your level of Well-Prepared, you may pull the trapping required for the current situation from your backpack (or similar) as long as it is Encumbrance 0, could feasibly been bought recently, and doesn’t stretch credibility too far. This could be anything from a flask of spirits to fortify a wounded comrade to a pfennig-whistle needed by a passing entertainer. Whenever you do this, you must deduct the cost for the prepared item from your purse, representing the coin you spent earlier. ", new Max(false, -1, "I"), new Test("", ""), 0),
            new Talent("Witch!", "You are a self-taught spellcaster who has figured out how to cast magic through trial and error. Add Language (Magick) to any Career you enter; if it is already in your Career, you may instead purchase the Skill for 5 XP fewer per Advance. Further, for the cost of a Resilience point, you may manifest (and permanently memorise) a spell from any Arcane Lore. You can do this a number of times equal to your level in this Talent. ", new Max(false, -1, "WP"), new Test("", ""), 0)];
        return allTalents;
    }

    static getFromDatabase(name) {
        var tal = this.getAllTalents();


        var s = name;
        if (name.toLowerCase().endsWith("(any)"))
            s = name.substring(0, name.length - 4).toLowerCase();

        var retData = [];

        for (var i = 0; i < tal.length; i++) {
            if (tal[i].name.toLowerCase().startsWith(s.toLowerCase()))
                retData.push(tal[i]);
            else if (name.startsWith("Craftsman") && name != "Craftsman (TRADE)") {

                if (name.trim().toLowerCase() == "craftsman (any)") {
                    var types = Skill.getFromDatabase("Trade (any)");

                    for (var j = 0; j < types.length; j++) {
                        var s = Talent.getFromDatabase("Craftsman (TRADE)")[0];

                        s.name = s.name.replaceAll("TRADE", types[j].specialistion)
                        s.description = s.description.replaceAll("TRADE", types[j].name);

                        retData.push(s);
                    }

                    break;
                }
                var t = Talent.getFromDatabase("Craftsman (TRADE)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("TRADE", type)
                t.description = t.description.replaceAll("TRADE", "Trade (" + type + ")");

                retData.push(t);
                break;
            }
            else if (name.startsWith("Savant") && name != "Savant (LORE)") {

                if (name.trim().toLowerCase() == "Savant (any)") {
                    var types = Skill.getFromDatabase("Lore (any)");


                    for (var j = 0; j < types.length; j++) {
                        var s = Talent.getFromDatabase("Savant (LORE)")[0];

                        s.name = s.name.replaceAll("LORE", types[j].specialistion)
                        s.description = s.description.replaceAll("LORE", types[j].name);

                        retData.push(s);
                    }

                    break;
                }
                var t = Talent.getFromDatabase("Savant (LORE)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("LORE", type)
                t.description = t.description.replaceAll("LORE", "LORE (" + type + ")");

                retData.push(t);
                break;
            }
            else if (name.startsWith("Etiquette") && name != "Etiquette (GROUP)") {

                if (name.trim().toLowerCase() == "etiquette (any)") {
                    var types = ["Scholars", "Guilder", "Cultist", "Nobles", "Criminals", "Servants", "Soldiers"];
                    for (var j = 0; j < types.length; j++) {
                        var s = Talent.getFromDatabase("Etiquette (GROUP)")[0];

                        s.name = s.name.replaceAll("GROUP", types[j])
                        s.description = s.description.replaceAll("GROUP", types[j]);

                        retData.push(s);
                    }

                    break;
                }

                var t = Talent.getFromDatabase("Etiquette (GROUP)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("GROUP", type)
                t.description = t.description.replaceAll("GROUP", + type);

                retData.push(t);
                break;
            }
            else if (name.startsWith("Fearless") && name != "Fearless (ENEMY)") {

                var t = Talent.getFromDatabase("Fearless (ENEMY)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("ENEMY", type)
                t.description = t.description.replaceAll("ENEMY", + type);

                retData.push(t);
                break;
            }
            else if (name.startsWith("Resistance") && name != "Resistance (THREAT)") {

                var t = Talent.getFromDatabase("Resistance (THREAT)")[0];
                if (name == "Resistance")
                    console.trace();
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("THREAT", type)
                t.description = t.description.replaceAll("THREAT", + type);

                retData.push(t);
                break;
            }
            else if (name.startsWith("Hatred") && name != "Hatred (GROUP)") {

                var t = Talent.getFromDatabase("Hatred (GROUP)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("GROUP", type)
                t.description = t.description.replaceAll("GROUP", + type);

                retData.push(t);
                break;
            }
            else if (name.startsWith("Strider") && name != "Strider (TERRAIN)") {

                var t = Talent.getFromDatabase("Strider (TERRAIN)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("TERRAIN", type)
                t.description = t.description.replaceAll("TERRAIN", + type);

                retData.push(t);
                break;
            }
            else if (name.startsWith("Master Tradesman") && name != "Master Tradesman (TRADE)") {

                var t = Talent.getFromDatabase("Master Tradesman (TRADE)")[0];
                var type = name.split('(')[1].split(')')[0];

                t.name = t.name.replaceAll("TRADE", type)
                t.description = t.description.replaceAll("TRADE", + type);

                retData.push(t);
                break;
            }
        }

        if (retData.length == 0) {
            console.log("Need to fix talent: " + name);
            //console.trace();
        }

        //if (name.startsWith("Fearless")) {
        //    var acc = ""
        //    for (var i = 0; i < retData.length; i++) {
        //        acc += retData[i].name + "---";
        //    }
        //    console.log(acc);
        //}

        return retData;
    }

    static rollRandom() {
        var table = [
            [3, Talent.getFromDatabase("Acute Sense (Any)")],
            [3, Talent.getFromDatabase("Ambidextrous")],
            [3, Talent.getFromDatabase("Animal Affinity")],
            [3, Talent.getFromDatabase("Artistic")],
            [3, Talent.getFromDatabase("Attractive")],
            [3, Talent.getFromDatabase("Coolheaded")],
            [3, Talent.getFromDatabase("Craftsman (Any)")],
            [3, Talent.getFromDatabase("Flee!")],
            [4, Talent.getFromDatabase("Hardy")],
            [3, Talent.getFromDatabase("Lightning Reflexes")],
            [3, Talent.getFromDatabase("Linguistics")],
            [4, Talent.getFromDatabase("Luck")],
            [3, Talent.getFromDatabase("Marksman")],
            [3, Talent.getFromDatabase("Mimic")],
            [3, Talent.getFromDatabase("Night Vision")],
            [3, Talent.getFromDatabase("Nimble Fingered")],
            [2, Talent.getFromDatabase("Noble Blood")],
            [3, Talent.getFromDatabase("Orientation")],
            [3, Talent.getFromDatabase("Perfect Pitch")],
            [4, Talent.getFromDatabase("Pure Soul")],
            [3, Talent.getFromDatabase("Read/Write")],
            [3, Talent.getFromDatabase("Resistance (Any)")],
            [3, Talent.getFromDatabase("Savvy")],
            [3, Talent.getFromDatabase("Sharp")],
            [4, Talent.getFromDatabase("Sixth Sense")],
            [3, Talent.getFromDatabase("Strong Legs")],
            [3, Talent.getFromDatabase("Sturdy")],
            [3, Talent.getFromDatabase("Suave")],
            [3, Talent.getFromDatabase("Sharp")],
            [4, Talent.getFromDatabase("Super Numerate")],
            [3, Talent.getFromDatabase("Very Resilient")],
            [3, Talent.getFromDatabase("Very Strong")],
            [3, Talent.getFromDatabase("Warrior Born")]];

        var roll = rand(1, 101);
        var total = 0;
        for (var i = 0; i < table.length; i++) {
            total += table[i][0];
            if (roll <= total)
                return table[i][1];
        }

        console.log("Error:" + total + ":" + roll);
    }

    static generateFromString(dataString) {
        var data = dataString.split("@");

        var name = data[0];
        var description = data[1];
        var max = Max.generateFromString(data[2]);
        var test = Test.generateFromString(data[3]);
        var timesTaken = parseInt(data[4]);

        return new Talent(name, description, max, test, timesTaken);
    }

    toString() {
        var str = "";
        str += this.name + "@" + this.description + "@" + this.max.toString() + "@" + this.test.toString() + "@" + this.timesTaken.toString();
        return str;
    }

    toHtml(character) {
        var str = "<div class=\"skillWindow\"><h3>" + this.name + "</h3>";

        str += "<b>Taken: " + this.timesTaken + "/" + ((this.max.constantMax) ? this.max.intMax : (character.getStatBonus(this.max.statMax) + "(" + Character.toLongStatName(this.max.statMax)) + " bonus)") + "</b><br>";
        if (this.test.skillName != "")
            str += "<b>Test: " + this.test.skillName + " " + this.test.testCondition + "</b><br>";

        str += this.description;

        return str + "</div>";
    }

    static compareTalents(a, b) {
        return a.name.localeCompare(b.name);
    }

    static talentArrayToHtml(character) {
        var tal = character.talents;
        tal = tal.sort(Talent.compareTalents);

        var str = "<div class=\"skillArrayWindow\"><table>";

        for (var i = 0; i < tal.length; i++) {
            var q = "<tr onmouseleave=\"hoverStop()\" onmousemove=\"hoverStart(event,'" + tal[i].toHtml(character).replaceAll("\"", "$") + "')\"><th>" + tal[i].name + "</th><th>" + tal[i].timesTaken + "</th></tr>";
            str += q;
        }

        str += "</table></div>";

        console.log(str);

        return str;
    }
}

class Max { //String breaker '}'
    constructor(constantMax, intMax, statMax) {
        this.constantMax = constantMax; //Bool
        this.intMax = intMax; //Int
        this.statMax = statMax; //String
    }

    static generateFromString(dataString) {
        var data = dataString.split("}");

        var constantMax = (data[0] == "true") ? true : false;
        var intMax = parseInt(data[1]);
        var statMax = data[2];

        return new Max(constantMax, intMax, statMax);
    }

    equals(other) {
        if (this.constantMax != other.constantMax)
            return false;
        if (this.intMax != other.intMax)
            return false;
        if (this.statMax != other.statMax)
            return false;
        return true;
    }

    toString() {
        return this.constantMax.toString() + "}" + this.intMax.toString() + "}" + this.statMax;
    }
}

class Test { //String breaker '}'
    constructor(skillName, testCondition) {
        this.skillName = skillName; //String
        this.testCondition = testCondition; //String
    }

    static generateFromString(dataString) {
        var data = dataString.split("}");

        var skillName = data[0];
        var testCondition = data[1];

        return new Test(skillName, testCondition);
    }

    equals(other) {
        if (this.skillName != other.skillName)
            return false;
        if (this.testCondition != other.testCondition)
            return false;
        return true;
    }

    toString() {
        return this.skillName + "}" + this.testCondition;
    }
}
//#endregion

//#region Skills
////////////////////////////////////////////////////////////////////////////////////
//Skills
////////////////////////////////////////////////////////////////////////////////////

class Skill { //String breaker '@', '}'
    constructor(name, stat, description, basic, specialistions, specialistion, advancments) {
        this.name = name; //String
        this.stat = stat; //string
        this.description = description; //String
        this.basic = basic; //bool
        this.specialistions = specialistions; //[String] 


        this.specialistion = specialistion; //String
        this.advancments = advancments; //Int
    }

    advance(adv) {
        this.advancments += adv;
        return this;
    }

    getName() {
        if (this.specialistion == "")
            return this.name;
        else
            return this.name + " (" + this.specialistion + ")";
    }

    equals(other) {
        if (this.name != other.name)
            return false;
        if (this.stat != other.stat)
            return false;
        if (this.description != other.description)
            return false;
        if (this.basic != other.basic)
            return false;
        if (this.specialistion != other.specialistion)
            return false;
        if (this.advancments != other.advancments)
            return false;
        for (var i = 0; i < this.specialistions.length; i++) {
            if (!other.specialistions.includes(this.specialistions[i])) {
                return false;
            }
        }
        return true;
    }

    static getAllBasicSkills() {
        var skills = this.getAllSkills();
        var ret = [];

        for (var i = 0; i < skills.length; i++) {
            if (skills[i].basic)
                ret.push(skills[i]);
        }

        return ret;
    }

    static getFromDatabase(name) {
        var skills = this.getAllSkills();

        var skillName = name.split('(')[0].trim();

        var extra = (name.split('(').length > 1) ? name.split('(')[1] : null;

        if (extra != null)
            extra = extra.substring(0, extra.length - 1).trim();

        var ret = [];
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].name.trim() == skillName) {
                if (extra != null) {
                    if (extra.toLowerCase().includes(skills[i].specialistion.toLowerCase().trim())) {
                        ret.push(skills[i]);
                        continue;
                    }
                    else if (extra.toLowerCase().includes("any")) {
                        ret.push(skills[i]);
                        continue;
                    }


                    var cont = false;
                    for (var j = 0; j < skills[i].specialistions.length; j++) {
                        if (extra.toLowerCase().includes(skills[i].specialistions[j].toLowerCase().trim()))
                            cont = true;
                    }

                    if (cont)
                        continue;

                    var t = skills[i];

                    //console.log(name + ":" + skillName + ":" + extra);
                    //console.log("Created skill: " + t.name + "(" + extra + ") ---" + skills[i].specialistions);

                    t.specialistion = extra;
                    t.specialistions.push(extra);


                    ret.push(t);
                    break;
                }
                else
                    ret.push(skills[i]);
            }
        }

        if (ret.length == 0) {
            console.log("Need to fix skill: " + name + "... extra:" + extra);
            console.trace();
        }

        return ret;
    }

    static getAllSkills() {
        var skills = [
            new Skill("Animal Care", "Int", "The Animal Care Skill lets you tend and care for animals, andheal them should they fall sick or become wounded.Having a single Advance in Animal Care means you can keepanimals healthy without needing to Test. You can also enact anAnimal Care Test to identify and resolve problems with animals,such as:• Spotting an illness.• Understanding reasons for fractiousness or discomfort.• Determining the quality of the animal.• Heal Intelligence Bonus + SL Wounds (Note: an animalcan only benefit from one healing roll after each encounter).• Staunching a Bleeding condition.• Preparing the animal for display.In combat, you may appraise an enemy animal with an AnimalCare Test. If successful, you and all you inform gain +10 to hitwhen attacking that animal — or anyone using it as a mount— until the end of your next turn, as you point out loose tack, alimp from a niggling wound, or highlight some other weaknessor vulnerability. Animal Care may only provide a maximum of+10 to hit per animal, no matter how many Tests are made tospot weaknesses.", false, [], "", 0),
            new Skill("Animal Training", "Int", "Animal Training represents your understanding of a particulartype of animal, and your ability to train them. A successful use ofthe Skill allows you to identify the Trained abilities possessed byan animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the AnimalTraining Endeavour between adventures (see page 196).In combat, a successful Opposed Animal Training/WillpowerTest allows you to intimidate a single animal belonging to yourSpecialisation; you cause Fear in the animal targeted until the endof your next turn (see page 190). When causing Fear in this way,you may subsequently use your Animal Training Skill insteadof Melee when defending against your target; with your GM’sapproval you may also use Animal Training to attack your target,issuing specific commands.", false, [" Demigryph", " Dog", " Horse", " Pegasus", " Pigeon"], "Demigryph", 0),
            new Skill("Animal Training", "Int", "Animal Training represents your understanding of a particulartype of animal, and your ability to train them. A successful use ofthe Skill allows you to identify the Trained abilities possessed byan animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the AnimalTraining Endeavour between adventures (see page 196).In combat, a successful Opposed Animal Training/WillpowerTest allows you to intimidate a single animal belonging to yourSpecialisation; you cause Fear in the animal targeted until the endof your next turn (see page 190). When causing Fear in this way,you may subsequently use your Animal Training Skill insteadof Melee when defending against your target; with your GM’sapproval you may also use Animal Training to attack your target,issuing specific commands.", false, [" Demigryph", " Dog", " Horse", " Pegasus", " Pigeon"], "Dog", 0),
            new Skill("Animal Training", "Int", "Animal Training represents your understanding of a particulartype of animal, and your ability to train them. A successful use ofthe Skill allows you to identify the Trained abilities possessed byan animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the AnimalTraining Endeavour between adventures (see page 196).In combat, a successful Opposed Animal Training/WillpowerTest allows you to intimidate a single animal belonging to yourSpecialisation; you cause Fear in the animal targeted until the endof your next turn (see page 190). When causing Fear in this way,you may subsequently use your Animal Training Skill insteadof Melee when defending against your target; with your GM’sapproval you may also use Animal Training to attack your target,issuing specific commands.", false, [" Demigryph", " Dog", " Horse", " Pegasus", " Pigeon"], "Horse", 0),
            new Skill("Animal Training", "Int", "Animal Training represents your understanding of a particulartype of animal, and your ability to train them. A successful use ofthe Skill allows you to identify the Trained abilities possessed byan animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the AnimalTraining Endeavour between adventures (see page 196).In combat, a successful Opposed Animal Training/WillpowerTest allows you to intimidate a single animal belonging to yourSpecialisation; you cause Fear in the animal targeted until the endof your next turn (see page 190). When causing Fear in this way,you may subsequently use your Animal Training Skill insteadof Melee when defending against your target; with your GM’sapproval you may also use Animal Training to attack your target,issuing specific commands.", false, [" Demigryph", " Dog", " Horse", " Pegasus", " Pigeon"], "Pegasus", 0),
            new Skill("Animal Training", "Int", "Animal Training represents your understanding of a particulartype of animal, and your ability to train them. A successful use ofthe Skill allows you to identify the Trained abilities possessed byan animal belonging to your Specialisation (see page 118). The Animal Training Skill also allows you to undertake the AnimalTraining Endeavour between adventures (see page 196).In combat, a successful Opposed Animal Training/WillpowerTest allows you to intimidate a single animal belonging to yourSpecialisation; you cause Fear in the animal targeted until the endof your next turn (see page 190). When causing Fear in this way,you may subsequently use your Animal Training Skill insteadof Melee when defending against your target; with your GM’sapproval you may also use Animal Training to attack your target,issuing specific commands.", false, [" Demigryph", " Dog", " Horse", " Pegasus", " Pigeon"], "Pigeon", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Cartography", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Engraving", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Mosaics", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Painting", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Sculpture", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Tattoo", 0),
            new Skill("Art", "Dex", "Create works of art in your chosen medium.Not having access to appropriate Trade Tools will incur a penaltyto your Test. The SL achieved determines the quality of the finalpiece. For complicated or large works of art, an Extended Testmay be required. The Art Skill has little use in combat, but marblebusts make marvellous improvised weapons.", false, ["Cartography", "Engraving", "Mosaics", "Painting", "Sculpture", "Tattoo", "Weaving"], "Weaving", 0),
            new Skill("Athletics", "Ag", "Your ability to run, jump and move with speed or grace, and toperform any general physical activity. Refer to Moving (see page164) for details on using Athletics in combat movement.", true, [], "", 0),
            new Skill("Bribery", "Fel", "Your ability to judge how likely a person is to accept a bribe, andhow best to offer the bribe so they will accept it. A successful Bribery Test tells you if a target may be bribed. If so,your GM will secretly determine the price of their cooperationusing the target’s Earnings (see page 52), increasing the amountaccording to their usual honesty and the risk involved in takingthe bribe. You then guess that target amount and the GM willtell you if the price is higher, lower, or equal. Each SL from yourinitial Bribery Test gives you another guess. At the end of thisprocess, you determine how much money to offer, based on whatyou have gleaned.Example: Snorri is trying to bribe his way past a city watchman;a character of the Brass Tier 2, meaning they roll 4d10 Brass forIncome. The GM decides the guard can be bribed and secretlyrolls 21 on the 4d10, meaning the price for bribing the guard is21 Brass. Letting Snorri through isn’t too risky for the watchman,and he does it often, so the GM doesn’t increase the bribe required.Snorri rolls 1 SL on his Bribery Test; so, he knows the watchman isopen to a bribe, and has 2 guesses as to his price. Snorri’s first guessis 15 Brass, to which his GM replies ‘higher’. His second guess is40, to which his GM replies ‘lower’. Snorri now knows he mustbribe the watchman between 15 and 40 Brass, so decides to aimhigh, and offers 30. Smiling, the watchman waves Snorri through.In combat, you may use Bribery as above to try to stop the fight,but treat the Test as Hard (–20) owing to the stress of the situation.If your target is not susceptible, you cannot afford the fee, or yourfoes do not speak your tongue, your pathetic attempts to buy themoff will be doomed to fail. Of course, if they have the advantage ofnumbers, what’s to prevent them from taking all of your money?", true, [], "", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Aqshy", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Azyr", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Chamon", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Dhar", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Ghur", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Ghyran", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Hysh", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Shyish", 0),
            new Skill("Channelling", "WP", "The Channelling Skill measures your ability to call upon andcontrol the various Winds of Magic, and is solely used by themagic rules. Channelling is a special skill in that it is bothGrouped, allowing for Specialisations, and also ungrouped, forthose not properly trained to channel magic. See Chapter 8:Magic for details concerning this.", false, ["Aqshy", "Azyr", "Chamon", "Dhar", "Ghur", "Ghyran", "Hysh", "Shyish", "Ulgu"], "Ulgu", 0),
            new Skill("Charm", "Fel", "Charm makes people think favourably of you, your opinions,and proposed actions. Passing an Opposed Charm/Cool Testallows you to influence the behaviour of one or more targets, upto a maximum number equal to your Fellowship Bonus + SL,affecting those with the lowest Willpower first. If a target isamenable to your Charm, the Test will be uncontested.Your GM may permit you to use Charm in Combat if they thinkyour foes might be susceptible to you pleading for your life ormaking persuasive arguments to stop the violence (althoughgood luck charming a Goblin)!If you use Charm as your Action, calculate the number of targetsaffected as normal. If you use it to defend, you only affect yourattacker. If you succeed, any affected targets will not attack youthis round and you gain +1 Advantage as normal. You may do thisin successive rounds until you choose to stop or fail a Charm Test,after which your words carry no more weight.", true, [], "", 0),
            new Skill("Charm Animal", "WP", "Your aptitude for befriending, quickly calming, or subjugatinganimals.Passing a Charm Animal Test allows you to influence thebehaviour of one or more animals, to a maximum of WillpowerBonus + SL. If the target animals are naturally docile, this Testmay be uncontested, but it will generally be Opposed by thetarget’s Willpower.In combat, you may use Charm Animal when facing animals. Ifyou succeed, any affected targets will not attack you this Roundand you gain +1 Advantage. You may do this in successive roundsuntil you choose to stop or fail a Charm Test, after which thecreature’s instincts take over and you have no further influence.", true, [], "", 0),
            new Skill("Climb", "S", "The ability to ascend steep or vertical surfaces.If time isn’t an issue, and a climb is relatively easy, anyone withClimb Skill is automatically assumed to be able to climb anyreasonably small height.For any other climbing, refer to page 165, which also handlesClimbing during combat. You may even find yourself climbinglarge opponents, though whether that is prudent is debatable.", true, [], "", 0),
            new Skill("Consume Alcohol", "T", "Your ability to handle alcohol without letting it cloud yourjudgment or render you senseless.After each alcoholic drink make a Consume Alcohol Test,modified by the strength of the drink. For each Test you fail, yousuffer a –10 penalty to WS, BS, Ag, Dex, and Int, to a maximumof –30 per Characteristic. After you fail a number of Tests equalto your Toughness Bonus, you are Stinking Drunk. Roll on thefollowing table to see what happens:1d10 Stinking Drunk1-2 ‘Marienburgher’s Courage!’: Gain a bonusof +20 to your Cool Skill.3-4 ‘You’re My Besht Mate!’: Ignore all yourexisting Prejudices and Animosities (see page190).5-6 ‘Why’s Everything Wobbling!’: On yourTurn, you can either Move or take an Action,but not both (see page 157).7-8 ‘I’ll Take Yer All On!’: Gain Animosity(Everybody!) (see page 190).9-10 ‘How Did I Get here?’: You wake up thenext day, massively hungover, with littlememory of what transpired. The GMand other players with you will fill in theembarrassing gaps if you investigate. Passa Consume Alcohol Test or also gain aPoisoned Condition (see page 169).After not drinking for an hour, enact a Challenging (+0)Consume Alcohol Test. The effects of being drunk will wearoff after 10–SL hours, with any Characteristic modifiers forbeing drunk lost over that time. After all effects wear off, enactanother Challenging (+0) Consume Alcohol Test. You nowgain a hangover, which is an Fatigued Condition that cannot beremoved for 5–SL hours.You may expend 1 Resolve point to ignore the negative modifiersof being drunk until the end of the next round (see page 171).", true, [], "", 0),
            new Skill("Cool", "WP", "Cool allows you to remain calm under stress, resist fear whenfaced with horror, and stick to your convictions.Cool is generally used to resist other Skills — Charm, Intimidate,and similar — but you may also be required to make a Cool Testwhen faced with anything forcing you to do something youwould rather not. Cool is also the primary Skill used to limitPsychology (see page 190).", true, [], "", 0),
            new Skill("Dodge", "Ag", "Dodge is your ability to avoid things, through ducking, diving,and moving quickly, and is used extensively to sidestep fallingrocks, incoming weapons, unexpected traps, and the like.In combat, Dodge is generally used to resist attacks or avoiddamage. Refer to Chapter 5: Rules for more on this.", true, [], "", 0),
            new Skill("Drive", "Ag", "Drive lets you guide vehicles — most commonly simple cartsand lumbering coaches, not to mention the more ‘experimental’creations of the Imperial Engineers — along the roads of theEmpire with as little incident as possible.Under normal circumstances, if you possess the Drive Skill, thereis no need to Test. If conditions are less than ideal — perhaps theroad is in poor condition, or the weather is terrible — a Drive Testwill be required. If you do not possess the Drive Skill, you may berequired to make a Test to carry out even basic manoeuvres. AnAstounding Failure (-6) on a Drive Test means something badhas happened. Roll on the following table:1d10 Result1-2 Snapped Harness: One horse (or equivalent)breaks free; reduce speed accordingly.3-5 Jolted Carriage: Passengers suffer 1 Woundand fragile cargos might be damaged.6-8 Broken Wheel: Pass a Drive Test everyround to avoid Crashing. Two-wheeledvehicles with a Broken Wheel Crashautomatically.9-10 Broken Axle: The vehicle goes out of controland Crashes.Crashing: Occupants of Crashing vehicles usually suffer 2d10Wounds modified by Toughness Bonus and Armour Pointsunless the vehicle was moving slowly (as determined by theGM). Crashed vehicles must be repaired by someone with anappropriate Trade Skill, such as Trade (Carpenter) or Trade(Cartwright). Spare wheels can be installed by anyone with aDrive Test or with an appropriate Trade Test.In combat, Drive may be used if circumstances allow — forinstance, if the party is in a coach being raided by outlaws, andyou wish to ram an enemy, or outrun them (see page 165).", true, [], "", 0),
            new Skill("Endurance", "T", "The Endurance Skill is called upon when you must endurehardship, withstand deprivation, sit without moving for longperiods of time, or survive harsh environments. In particular,Endurance is Tested to resist or recover from various Conditions(see page 167) and helps you recover lost Wounds. Refer toChapter 5: Rules for more on this.", true, [], "", 0),
            new Skill("Entertain", "Fel", "Allows you to delight crowds with the spoken word, perhaps bysinging, acting, or attempting a few jokes. A successful use of theEntertain Skill means you have entertained patrons near enoughto hear you; the SL indicates how well you have done.In combat, it is unlikely that Entertain will be of much use,although you may come up with an interesting way to useEntertain (Acting) to confuse or mislead your opponents.", true, ["Acting", "Comedy", "Singing", "Storytelling"], "Acting", 0),
            new Skill("Entertain", "Fel", "Allows you to delight crowds with the spoken word, perhaps bysinging, acting, or attempting a few jokes. A successful use of theEntertain Skill means you have entertained patrons near enoughto hear you; the SL indicates how well you have done.In combat, it is unlikely that Entertain will be of much use,although you may come up with an interesting way to useEntertain (Acting) to confuse or mislead your opponents.", true, ["Acting", "Comedy", "Singing", "Storytelling"], "Comedy", 0),
            new Skill("Entertain", "Fel", "Allows you to delight crowds with the spoken word, perhaps bysinging, acting, or attempting a few jokes. A successful use of theEntertain Skill means you have entertained patrons near enoughto hear you; the SL indicates how well you have done.In combat, it is unlikely that Entertain will be of much use,although you may come up with an interesting way to useEntertain (Acting) to confuse or mislead your opponents.", true, ["Acting", "Comedy", "Singing", "Storytelling"], "Singing", 0),
            new Skill("Entertain", "Fel", "Allows you to delight crowds with the spoken word, perhaps bysinging, acting, or attempting a few jokes. A successful use of theEntertain Skill means you have entertained patrons near enoughto hear you; the SL indicates how well you have done.In combat, it is unlikely that Entertain will be of much use,although you may come up with an interesting way to useEntertain (Acting) to confuse or mislead your opponents.", true, ["Acting", "Comedy", "Singing", "Storytelling"], "Storytelling", 0),
            new Skill("Evaluate", "Int", "Lets you determine the value of rare artefacts, unusual tradegoods, and works of art. Everybody is assumed to know therelative worth of general items, but a successful use of theEvaluate allows you to identify the value of curious and uniqueitems. A successful Evaluate Test may also alert you if the goods(or coins) you are studying are counterfeit — this Test willusually be Opposed by the forger’s SL on their Art or TradeTest. Your GM may apply modifiers based on just how rare orobscure the item is, or on your character’s particular expertiseor background.", false, [], "", 0),
            new Skill("Gamble", "Int", "Allows you to measure the likelihood that a bet will pay off, aswell as successfully engage in various games of chance.To represent a gambling match, all players make a Gamble Test— applying any appropriate modifiers for familiarity with thegame — and the player with the highest SL wins. On a tie, anylower scoring players drop out, and those remaining enact anotherGamble Test, repeating this process until you have a winner.If you wish to influence the game through less honest mechanics,see Sleight of Hand.", true, [], "", 0),
            new Skill("Gossip", "Fel", "You can quickly ferret out interesting and useful news, andspread rumours of your own. A successful Gossip Test meansyou have found out one useful piece of information, which yourGM can impart to you, about the local area. Each SL eitheroffers you an additional piece of information, or the chanceto spread a rumour to a number of individuals equal to yourFellowship Bonus. The time required for a Gossip Test dependson how circumspect the players are being, and how busy thearea is, as determined by the GM.It is unlikely that Gossip will be much use in combat, but if yourattacker happens to be local, and you happen to know somethingreally juicy…", true, [], "", 0),
            new Skill("Haggle", "Fel", "Haggle allows you to secure better deals when negotiating withothers. In general, Haggle is used to see whether you do, or donot, make a good deal, most commonly with an Opposed HaggleTest. Specifically, it can be used when shopping to secure betterprices. For information on this, refer to Chapter 11: Consumers’Guide.", true, [], "", 0),
            new Skill("Heal", "Int", "You’ve been trained to deal with injuries and diseases. A successfulHeal Test allows you to do one of the following:• Diagnose an illness, infection, or disease.• Treat a disease (see page 188).• Heal wounds equal to your Intelligence Bonus + SL (Note:a patient can only benefit from one Heal roll after eachencounter). If sterile liquids or appropriate poultices anddressings are used, no Infection will develop from the injury(see page 181).• Staunch a Bleeding Condition, with each SL removing anextra Bleeding Condition.A Failed Heal Test can potentially cause Wounds if yourIntelligence Bonus + SL totals less than 0. On an AstoundingFailure, your patient will also contract a Minor Infection (seepage 187).If administering to someone who has a disease, a successful HealTest ensures that you do not contract the disease for that day.Each SL also prevents one other character encountering thepatient that day from catching the disease. For each full day thepatient spends resting under your care, the duration of the diseaseis reduced by one, to a minimum of one. For more informationsee Disease and Infection in Chapter 5: Rules.Certain injuries require Surgery; see the Surgery Talent fordetails. For more information on healing wounds, refer to Injuryin Chapter 5: Rules.Your GM may apply modifiers to Heal Tests to reflect thevirulence of the disease, the suitability of conditions andmaterials, or the stress of your circumstances. If healing duringcombat, Tests will likely be Challenging (+0) at the very least.", false, [], "", 0),
            new Skill("Intimidate", "S", "Allows you to coerce or frighten sentient creatures. The precisemanner of initiating an Intimidate Test depends on context:while it is generally accompanied by an overt threat, sometimes asubtle implication or even a look is enough. Intimidate is almostalways Opposed by your target’s Cool Skill; if successful, youcan intimidate a number of targets up to your Strength Bonus+ SL. Each will react to Intimidate based on their individualpersonalities and how successful you were in menacing them, butin all cases, they will back down or move out of the way and willnot speak out against you, or they will alternatively accept combatis the only way forward and prepare their weapons.In combat, you cause Fear (see page 190) in all Intimidated targets.You may also use your Intimidate Skill instead of Melee whendefending against those afraid of you, causing the Intimidatedparties to back away from the fight with your will and posturealone. Further, with your GM’s approval, you may use Intimidateto ‘attack’ such targets, issuing specific commands, such as ‘dropyour weapons’ or ‘get out of here!’. However, if you fail any ofthese subsequent Intimidate Tests, you no longer Intimidate (orcause Fear) in affected opponents. With your GM’s permissionyou may try to Intimidate them again in a later Round, but thiswill incur a negative modifier, as they are less likely to fear youhaving seen through your bravado once already.", true, [], "", 0),
            new Skill("Intuition", "I", "The Intuition Skill allows you to get a feel for your surroundings,leading you to notice when something is wrong, and gives youa sense of when people may be hiding something from you. Asuccessful use of the Intuition Skill gives you subtle or implicitintelligence relating to your environment, determined by yourGM. This may be information such as whether someone believeswhat they are saying, what the general attitude is towards thelocal noble, or if the helpful local’s motives are as pure as theyseem. If someone is actively trying to hide their intent, they mayresist your Intuition with Cool or Entertain (Acting).In combat, a successful Intuition Test may be used to give you +1Advantage as you weigh the environment and your opponents.You may continue building Advantage in subsequent turnsproviding you are able to observe your targets and are notinterrupted (such as being attacked); you may gain a maximumAdvantage equal to your Intelligence Bonus in this manner.", true, [], "", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Battle Tongue", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Bretonnian", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Classical", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Guilder", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Khazalid", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Magick", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Thief", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Tilean", 0),
            new Skill("Language", "Int", "The Language Skill grants you access to extra languages beyondyour native tongue. All characters are automatically assumed tobe able to speak ‘Reikspiel’ — the language of the Empire —and their native language (if your character has one different to Reikspiel), without ever having to Test. If your game is not set inthe Empire, replace Reikspiel with the local language.If you possess a Language Skill, you are generally able to makeyourself understood in that language, or to understand simpleconcepts. You will be asked to Test your Language Skill whena particularly difficult concept must be conveyed, or an obscuredialect or vocabulary is employed.Note: Language (Magick) is used to cast spells and mayoccasionally be Tested, with… unpleasant consequences if failed.Refer to Chapter 8: Magic, for more on this.", false, ["Battle Tongue", "Bretonnian", "Classical", "Guilder", "Khazalid", "Magick", "Thief", "Tilean", "Estalian"], "Estalian", 0),
            new Skill("Leadership", "Fel", "A measure of your ability to lead others and command theirrespect. While most often associated with martial situations, aresolute leader can quickly direct a fast response to a fire or othersuch calamity, and nobles use the Skill frequently to commandtheir lessers.A successful Leadership Test allows you to issue orders to anumber of targets equal to your Fellowship Bonus + SL. If thetargets are your natural subordinates — a noble commandingserfs, or a sergeant commanding his troops — commands areusually unopposed. If there is no natural hierarchy in place, or theorder is particularly challenging — such as ordering your soldiersto charge a Hydra head on — the Test is Opposed by your targets’Cool.In combat, you may use Leadership to encourage yoursubordinates. A successful Leadership Test confers a bonus of+10 to all Psychology Tests until the end of the next round (seepage 190).Further, Leadership can be used to transfer Advantage to alliesable to hear you; following a successful Leadership Test, you maytransfer an Advantage to one ally of your choice, plus a further +1Advantage per SL scored, which can again go to any allies of yourchoice within earshot.", true, [], "", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Engineering", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Geology", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Heraldry", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "History", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Law", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Magick", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Metallurgy", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Science", 0),
            new Skill("Lore", "Int", "Having a Lore Skill means you’ve been formally taught, or havesomehow otherwise learned, a branch of specialist knowledge.Possessing a Lore Skill means you are broadly knowledgeable inthe specialisation and don’t need to make a Test in order for theGM to supply you with relevant facts. If you are seeking specific,less well-known information, you will be required to make a LoreTest, modified by how obscure the information is, with the SLindicating how much detail you recall.In combat, successful Lore Tests may afford you +1 Advantage if appropriate (with your GM’s approval). For instance, Lore(Geology) may give you an edge if fighting in a rocky cavern,or Lore (Engineering) may help you if fighting a foe armedwith a complex mechanical device. You may continue buildingAdvantage in subsequent turns providing the circumstances arecorrect (as determined by the GM) and you are not interrupted;you may gain a maximum Advantage equal to your IntelligenceBonus in this manner.", false, ["Engineering", "Geology", "Heraldry", "History", "Law", "Magick", "Metallurgy", "Science", "Theology"], "Theology", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Basic", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Brawling", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Cavalry", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Fencing", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Flail", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Parry", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Pole-Arm", 0),
            new Skill("Melee", "WS", "The Melee Skill represents specific training with a single typeof close combat weaponry. Each Melee Specialisation indicatestraining in using a specific class of weapon. If you don’t havethe correct Specialisation for a weapon you wish to use, refer toChapter 11: Consumers’ Guide for the correct weapon entry,and what penalties you will suffer.See Chapter 5: Rules for moredetail about combat and using the Melee Skill.", true, ["Basic", "Brawling", "Cavalry", "Fencing", "Flail", "Parry", "Pole-Arm", "Two-Handed"], "Two-Handed", 0),
            new Skill("Navigation", "I", "Navigation allows you to find your way in the wilderness usinglandmarks, stellar bodies or maps. Possessing the Navigation Skill means you know roughly where you are, and can find your waybetween well-known landmarks without a Test. A Test is onlyrequired if you are disoriented or travelling far from the beatenpath, with success showing you the correct direction, or allowingyou to avoid mishap.If you are navigating a long journey, your GM may ask for anextended Navigation Test, modified by conditions, visiblelandmarks, and access to reliable geographical information. The SL required to succeed depends on how far the destination is, with each Test representing between an hour and a day’s travel,depending on the nature of the journey.", true, [], "", 0),
            new Skill("Outdoor Survival", "Int", "The Outdoor Survival Skill is used to survive in the wild,including the ability to fish, hunt, forage, and build fires andshelters. Experienced travellers are skilled at reading the signsof incoming inclement weather and finding the spoor of variousdangerous beasts.When camping, make an Outdoor Survival Test, modified by theharshness of conditions — for instance, a Test is Challenging (+0)if it is raining, Hard (–20) in a storm. A successful Test indicates you can provide yourself sustenance and shelter for the night.Each SL allows you to provide for one more character. If the Testis failed, you must make a Challenging (+0) Endurance Testor receive the Fatigued Condition. If you suffer an Astounding Failure, something untoward has happened, as determined by the GM; perhaps your camp is attacked in the night?When fighting in the wilderness, you may make an Outdoor Survival Test to receive +1 Advantage, in the same way asIntuition, to a maximum number of Advantage equal to your Intelligence Bonus, as you spy out treacherous and advantageousterrain that you can best use to your advantage.", true, [], "", 0),
            new Skill("Perception", "I", "Your ability to notice things with your senses — sight, smell,hearing, touch, and taste, and any other senses you may possess,such as magical or non-Human senses. Your GM may ask for aPerception Test to detect something, like movement behind thetreeline, the presence of a trap, or someone following you, modifiedby how easy it is to notice. Perception is also used to resist attemptsto hide things through Skills such as Sleight of Hand or Stealth. Perception has multiple uses in combat, most commonly to notice important details beyond the immediately obvious aboutthe surrounding environment and your opponents, as determined by the GM.", true, [], "", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Acrobatics", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Clowning", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Dancing", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Firebreathing", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Juggling", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Miming", 0),
            new Skill("Perform", "Ag", "You’ve learned a physically demanding art, perhaps as a wayof making a living, maybe as a street entertainer or as part of atravelling carnival. A successful use of the Perform Skill allowsyou to entertain all patrons close enough to see and hear you; theSL indicate how well you have done.In combat, certain physical Perform specialisations may give youan edge. With your GM’s permission, Perform (Acrobatics) maybe used in lieu of Dodge. Other Perform Skills may be useful indistracting foes, perhaps gaining you an Advantage if you cancome up with a creative way to do so. And some Perform skillscan be directly used as a weapon if you have the correct trappings,such as Perform (Firebreathing)!", false, ["Acrobatics", "Clowning", "Dancing", "Firebreathing", "Juggling", "Miming", "Rope Walking"], "Rope Walking", 0),
            new Skill("Pick Lock", "Dex", "You know the mechanisms of locks and how to open them without their proper keys. Picking a lock is often an ExtendedTest, with the number of SL required to open the lock dependenton the complexity of the lock.", false, [], "", 0),
            new Skill("Play", "Dex", "Your ability to make music with an instrument, hopefullywell enough to impress others. A successful Play Test lets youentertain those near enough to see and hear you; the SL indicatesthe quality of the piece played.", false, ["Bagpipe", "Lute", "Harpsichord", "Horn", "Violin"], "Bagpipe", 0),
            new Skill("Play", "Dex", "Your ability to make music with an instrument, hopefullywell enough to impress others. A successful Play Test lets youentertain those near enough to see and hear you; the SL indicatesthe quality of the piece played.", false, ["Bagpipe", "Lute", "Harpsichord", "Horn", "Violin"], "Lute", 0),
            new Skill("Play", "Dex", "Your ability to make music with an instrument, hopefullywell enough to impress others. A successful Play Test lets youentertain those near enough to see and hear you; the SL indicatesthe quality of the piece played.", false, ["Bagpipe", "Lute", "Harpsichord", "Horn", "Violin"], "Harpsichord", 0),
            new Skill("Play", "Dex", "Your ability to make music with an instrument, hopefullywell enough to impress others. A successful Play Test lets youentertain those near enough to see and hear you; the SL indicatesthe quality of the piece played.", false, ["Bagpipe", "Lute", "Harpsichord", "Horn", "Violin"], "Horn", 0),
            new Skill("Play", "Dex", "Your ability to make music with an instrument, hopefullywell enough to impress others. A successful Play Test lets youentertain those near enough to see and hear you; the SL indicatesthe quality of the piece played.", false, ["Bagpipe", "Lute", "Harpsichord", "Horn", "Violin"], "Violin", 0),
            new Skill("Pray", "Fel", "Your ability to invoke, or otherwise commune with, a deity.For more information on using the Pray Skill to seek divineintervention, see Chapter 7: Religion & Belief.In combat, if your GM deems it appropriate considering yourcircumstances and faith, you may use Pray to meditate and focusyour mind. Each round you spend praying in combat — andmaking a successful Pray Test — gives you +1 Advantage. Youcan gain additional Advantage this way, up to a maximum of yourFellowship Bonus.Further, if your enemies understand your language and recognise(and fear) your deity, the GM may allow you to use Pray in lieuof the Intimidate Skill.", false, [], "", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Blackpowder", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Bow", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Crossbow", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Engineering", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Entangling", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Explosives", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Sling", 0),
            new Skill("Ranged", "BS", "Whilst anyone can throw a rock simply using their Ballistic Skill,it takes training and practice to use weapons like bows and pistols.Each Ranged Specialisation is specific to a group of rangedweapons. If you don’t have the Ranged Specialisation for aweapon you wish to use, refer to Chapter 11: Consumers’ Guideto see what penalties you will suffer when using the weapon. SeeChapter 5: Rules for full detail about ranged combat.", false, ["Blackpowder", "Bow", "Crossbow", "Engineering", "Entangling", "Explosives", "Sling", "Throwing"], "Throwing", 0),
            new Skill("Research", "Int", "How adept you are at pulling useful and frequently obscureknowledge from libraries and other such storehouses ofinformation. Research requires you have the Read/Write Talent(see page142).Simply possessing the Research Skill indicates you can find straightforward information from a clearly indexed librarywithout a Test given enough time. If you are seeking specific, less well-known information, or you are in a rush, you will berequired to make an Extended Research Test, with the Difficulty modified by the library size, and the target SL depending upon the obscurity of the topic. Research has no use in combat beyond perhaps finding you a useful manual on sword-fighting techniques.", false, [], "", 0),
            new Skill("Ride", "Ag", "How proficient you are at riding a particular group of animals;Ride (Horse), for example, will let you ride Horses, Mules,Donkeys, and similar. You’ll only need to make a Test when doingsomething out of the ordinary, such as racing, dressage, traversingdangerous terrain, or charging into combat. Otherwise, if youhave at least one Advance in the Skill, you are presumed to beable to ride around without need of a Test.If mounted on a steed, you move using the steed’s Movementstatistic; if you wish to run, jump, or leap, you use your Ride Skill,not Athletics. An extended Ride Test may be needed if you areracing somewhere, the target SL depending on the length of thejourney, the number of Tests indicating how long you take toarrive. A Ride Test may be modified by environmental conditions,and the temperament of your mount. For more information onmounts, see Chapter 12: Bestiary.The Ride skill can be used extensively in combat. See Chapter 5:Rules, for more on mounted combat.", true, ["Demigryph", "Great Wolf", "Griffon", "Horse", "Pegasus"], "Demigryph", 0),
            new Skill("Ride", "Ag", "How proficient you are at riding a particular group of animals;Ride (Horse), for example, will let you ride Horses, Mules,Donkeys, and similar. You’ll only need to make a Test when doingsomething out of the ordinary, such as racing, dressage, traversingdangerous terrain, or charging into combat. Otherwise, if youhave at least one Advance in the Skill, you are presumed to beable to ride around without need of a Test.If mounted on a steed, you move using the steed’s Movementstatistic; if you wish to run, jump, or leap, you use your Ride Skill,not Athletics. An extended Ride Test may be needed if you areracing somewhere, the target SL depending on the length of thejourney, the number of Tests indicating how long you take toarrive. A Ride Test may be modified by environmental conditions,and the temperament of your mount. For more information onmounts, see Chapter 12: Bestiary.The Ride skill can be used extensively in combat. See Chapter 5:Rules, for more on mounted combat.", true, ["Demigryph", "Great Wolf", "Griffon", "Horse", "Pegasus"], "Great Wolf", 0),
            new Skill("Ride", "Ag", "How proficient you are at riding a particular group of animals;Ride (Horse), for example, will let you ride Horses, Mules,Donkeys, and similar. You’ll only need to make a Test when doingsomething out of the ordinary, such as racing, dressage, traversingdangerous terrain, or charging into combat. Otherwise, if youhave at least one Advance in the Skill, you are presumed to beable to ride around without need of a Test.If mounted on a steed, you move using the steed’s Movementstatistic; if you wish to run, jump, or leap, you use your Ride Skill,not Athletics. An extended Ride Test may be needed if you areracing somewhere, the target SL depending on the length of thejourney, the number of Tests indicating how long you take toarrive. A Ride Test may be modified by environmental conditions,and the temperament of your mount. For more information onmounts, see Chapter 12: Bestiary.The Ride skill can be used extensively in combat. See Chapter 5:Rules, for more on mounted combat.", true, ["Demigryph", "Great Wolf", "Griffon", "Horse", "Pegasus"], "Griffon", 0),
            new Skill("Ride", "Ag", "How proficient you are at riding a particular group of animals;Ride (Horse), for example, will let you ride Horses, Mules,Donkeys, and similar. You’ll only need to make a Test when doingsomething out of the ordinary, such as racing, dressage, traversingdangerous terrain, or charging into combat. Otherwise, if youhave at least one Advance in the Skill, you are presumed to beable to ride around without need of a Test.If mounted on a steed, you move using the steed’s Movementstatistic; if you wish to run, jump, or leap, you use your Ride Skill,not Athletics. An extended Ride Test may be needed if you areracing somewhere, the target SL depending on the length of thejourney, the number of Tests indicating how long you take toarrive. A Ride Test may be modified by environmental conditions,and the temperament of your mount. For more information onmounts, see Chapter 12: Bestiary.The Ride skill can be used extensively in combat. See Chapter 5:Rules, for more on mounted combat.", true, ["Demigryph", "Great Wolf", "Griffon", "Horse", "Pegasus"], "Horse", 0),
            new Skill("Ride", "Ag", "How proficient you are at riding a particular group of animals;Ride (Horse), for example, will let you ride Horses, Mules,Donkeys, and similar. You’ll only need to make a Test when doingsomething out of the ordinary, such as racing, dressage, traversingdangerous terrain, or charging into combat. Otherwise, if youhave at least one Advance in the Skill, you are presumed to beable to ride around without need of a Test.If mounted on a steed, you move using the steed’s Movementstatistic; if you wish to run, jump, or leap, you use your Ride Skill,not Athletics. An extended Ride Test may be needed if you areracing somewhere, the target SL depending on the length of thejourney, the number of Tests indicating how long you take toarrive. A Ride Test may be modified by environmental conditions,and the temperament of your mount. For more information onmounts, see Chapter 12: Bestiary.The Ride skill can be used extensively in combat. See Chapter 5:Rules, for more on mounted combat.", true, ["Demigryph", "Great Wolf", "Griffon", "Horse", "Pegasus"], "Pegasus", 0),
            new Skill("Row", "S", "Your prowess at pulling an oar and moving a boat through thewater. The Row Skill is typically only used when racing, navigatingrapids, desperately avoiding Bog Octopuses, or similar unusual ordangerous feats. Anyone with the Skill is automatically presumed to be able to scull about a pond, or over a gentle river, withouta Test. Those without the skill may have to make a Test foranything but the most basic manoeuvres.", true, [], "", 0),
            new Skill("Sail", "Ag", "Your ability to operate and manoeuvre a sailing vessel — includingknotwork, steering, gauging the wind, and more. Assuming youhave enough trained crew for your vessel, you only use the SailSkill when you must push your vessel to perform, either by racing,navigating particularly dangerous shoals, struggling against badweather, or similar difficulties. Simply sailing with a gentle wind,or guiding a ship downriver, doesn’t require a Test for those withSail. The skill can also be used for sailing-related activities liketying knots, or tying others up in knots.As sailing one ship is not so different to sailing another, havingany Sail Speciality makes all other Sail Specialities Basic Skillsfor you.", false, ["Barge", "Caravel", "Cog", "Frigate", "Wolfship"], "Barge", 0),
            new Skill("Sail", "Ag", "Your ability to operate and manoeuvre a sailing vessel — includingknotwork, steering, gauging the wind, and more. Assuming youhave enough trained crew for your vessel, you only use the SailSkill when you must push your vessel to perform, either by racing,navigating particularly dangerous shoals, struggling against badweather, or similar difficulties. Simply sailing with a gentle wind,or guiding a ship downriver, doesn’t require a Test for those withSail. The skill can also be used for sailing-related activities liketying knots, or tying others up in knots.As sailing one ship is not so different to sailing another, havingany Sail Speciality makes all other Sail Specialities Basic Skillsfor you.", false, ["Barge", "Caravel", "Cog", "Frigate", "Wolfship"], "Caravel", 0),
            new Skill("Sail", "Ag", "Your ability to operate and manoeuvre a sailing vessel — includingknotwork, steering, gauging the wind, and more. Assuming youhave enough trained crew for your vessel, you only use the SailSkill when you must push your vessel to perform, either by racing,navigating particularly dangerous shoals, struggling against badweather, or similar difficulties. Simply sailing with a gentle wind,or guiding a ship downriver, doesn’t require a Test for those withSail. The skill can also be used for sailing-related activities liketying knots, or tying others up in knots.As sailing one ship is not so different to sailing another, havingany Sail Speciality makes all other Sail Specialities Basic Skillsfor you.", false, ["Barge", "Caravel", "Cog", "Frigate", "Wolfship"], "Cog", 0),
            new Skill("Sail", "Ag", "Your ability to operate and manoeuvre a sailing vessel — includingknotwork, steering, gauging the wind, and more. Assuming youhave enough trained crew for your vessel, you only use the SailSkill when you must push your vessel to perform, either by racing,navigating particularly dangerous shoals, struggling against badweather, or similar difficulties. Simply sailing with a gentle wind,or guiding a ship downriver, doesn’t require a Test for those withSail. The skill can also be used for sailing-related activities liketying knots, or tying others up in knots.As sailing one ship is not so different to sailing another, havingany Sail Speciality makes all other Sail Specialities Basic Skillsfor you.", false, ["Barge", "Caravel", "Cog", "Frigate", "Wolfship"], "Frigate", 0),
            new Skill("Sail", "Ag", "Your ability to operate and manoeuvre a sailing vessel — includingknotwork, steering, gauging the wind, and more. Assuming youhave enough trained crew for your vessel, you only use the SailSkill when you must push your vessel to perform, either by racing,navigating particularly dangerous shoals, struggling against badweather, or similar difficulties. Simply sailing with a gentle wind,or guiding a ship downriver, doesn’t require a Test for those withSail. The skill can also be used for sailing-related activities liketying knots, or tying others up in knots.As sailing one ship is not so different to sailing another, havingany Sail Speciality makes all other Sail Specialities Basic Skillsfor you.", false, ["Barge", "Caravel", "Cog", "Frigate", "Wolfship"], "Wolfship", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Grey Order", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Guild (any one)", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Ranger", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Scout", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Thief", 0),
            new Skill("Secret Signs", "Int", "You’ve been taught how to use clandestine markings onlyintelligible to members of a select group. There are all mannerof reasons why someone may want to leave a secret message:vagabonds might indicate which homeowners are likely to offeralms, thieves may want to indicate weaknesses, or likely marks,while scouts may want to warn one another about a dangerousmonster’s lair nearby.This Skill does not usually need to be Tested — you can decipherany appropriate signs you can see if you have this Skill. But if thesigns have been disturbed, worn away, or if you are pressed fortime, then a Test will likely be required. Most messages are verysimple, no more than three words.", false, ["Grey Order", "Guild (any one)", "Ranger", "Scout", "Thief", "Vagabond"], "Vagabond", 0),
            new Skill("Set Trap", "Dex", "From a simple snare, or bear-trap, to more spectacular deviceslike Von Grizzel’s Thief-Render, players are unlikely to venturefar in the Old World without encountering traps. The SetTrap Skill measures your ability to set and disarm traps ofall varieties. Anyone with the skill is automatically assumedto be able to activate and disarm traps given enough time. ATest is normally only required if attempting to use the Skillswiftly or if otherwise under pressure, or if the trap is especiallycomplex. A selection of simple traps can be found in Chapter11: Consumers’ Guide.Setting or disarming most traps requires an Average (+20%) SetTrap Test, but more complex devices may require an extendedTest, needing several SL over multiple rounds to set.", false, [], "", 0),
            new Skill("Sleight of Hand", "Dex", "Lets you pick pockets, palm objects, and perform minor tricksof prestidigitation, as well as cheating with games of chance.This Skill is typically Opposed by the Perception Skill of yourtarget; success means you have palmed the object, picked thepocket, or swapped the cards, while a Marginal Success (+0 to+1) may suggest that your nefarious misdeeds have left youropponent suspicious.You can also use Sleight of Hand to ‘help’ your Gamble Skillwhen playing appropriate games of chance. Before any round (orsimilar, depending upon the game at hand) you can attempt aSleight of Hand Test (which will be opposed if others suspect).If successful, you may reverse your Gamble Test for the roundif this will score a Success. If failed, your opponents may not bebest pleased…Sleight of Hand and combat rarely mix, though inventive playersmay be able to conjure an impressive distraction with GMapproval, perhaps even gaining Advantage by making a Daggerseemingly appear from nowhere, surprising a superstitious foe.", false, [], "", 0),
            new Skill("Stealth", "Ag", "Allows you to creep quietly and conceal yourself in shadows more readily than most. Stealth is generally Opposed by an opponent’sPerception Skill, and Tests will be modified by how dark or wellconcealed your route is, as well as how circumspectly you aredressed. An Impressive or Astounding Failure on a Stealth Testwill likely draw the immediate attention of the enemies you weretrying to avoid in the first place.Stealth has many potential applications in combat, most usefullyto hide oneself in preparation for an Ambush, or to creep aroundan opponent in order to attack from behind. See Chapter 5:Rules for the implications of this. Of course, you can also use the Skill to escape a conflict unseen…", true, ["Rural", "Underground", "Urban"], "Rural", 0),
            new Skill("Stealth", "Ag", "Allows you to creep quietly and conceal yourself in shadows more readily than most. Stealth is generally Opposed by an opponent’sPerception Skill, and Tests will be modified by how dark or wellconcealed your route is, as well as how circumspectly you aredressed. An Impressive or Astounding Failure on a Stealth Testwill likely draw the immediate attention of the enemies you weretrying to avoid in the first place.Stealth has many potential applications in combat, most usefullyto hide oneself in preparation for an Ambush, or to creep aroundan opponent in order to attack from behind. See Chapter 5:Rules for the implications of this. Of course, you can also use the Skill to escape a conflict unseen…", true, ["Rural", "Underground", "Urban"], "Underground", 0),
            new Skill("Stealth", "Ag", "Allows you to creep quietly and conceal yourself in shadows more readily than most. Stealth is generally Opposed by an opponent’sPerception Skill, and Tests will be modified by how dark or wellconcealed your route is, as well as how circumspectly you aredressed. An Impressive or Astounding Failure on a Stealth Testwill likely draw the immediate attention of the enemies you weretrying to avoid in the first place.Stealth has many potential applications in combat, most usefullyto hide oneself in preparation for an Ambush, or to creep aroundan opponent in order to attack from behind. See Chapter 5:Rules for the implications of this. Of course, you can also use theS kill to escape a conflict unseen…", true, ["Rural", "Underground", "Urban"], "Urban", 0),
            new Skill("Swim", "S", "Your ability to swim in water without drowning. If you have theSwim Skill, you are automatically presumed to be able to swimfreely without a Test. But if you find yourself in difficult currents,racing, or fleeing from an oversized shark sent by Stromfels, theGod of Drowning, a Test will be required. This may be modifiedby the condition of the water, or how encumbered you are byclothes, armour, and other trappings.Swim is only used in combat if you happen to be fighting in thewater, where it replaces Skills like Athletics to govern Movement.If exact speeds are required, you swim at half your Movementrate, using the normal rules for moving found on page 164.", false, [], "", 0),
            new Skill("Track", "I", "Your ability to follow subtle trails left by others. Track is usedto follow difficult trails across the wilderness. This is not askill for following a set of footprints in the snow — a simplePerception test covers that — Track involves deeper knowledgeand awareness used to recognise the subtle signs of a quarry’spassage. You can also attempt to hide your trail, in which case useyour Track skill to oppose your pursuer’s Track Test.Often an Extended Track Test is required to follow a trail,with the Difficulty modified by how fresh the tracks are, andhow suitable the ground is: damp earth betrays passage betterthan stony ground. The GM may also use the Pursuit rules todetermine if you manage to track down a fleeing quarry (see page166).", false, [], "", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Apothecary", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Calligrapher", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Chandler", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Carpenter", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Cook", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Embalmer", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Smith", 0),
            new Skill("Trade", "Dex", "Most folk of the Reikland follow a trade; even adventurers oftenhave a more reliable, or respectable career to fall back on, betweenbouts of hair-raising, bowel-loosening excitement.The Trade Skill represents your ability to create something orprovide a service, as well as your knowledge of the relevant loresurrounding your trade.Having the Skill is enough to automatically perform the tasksassociated with your trade, assuming you have the correctresources and tools. You need only Test your Trade Skill if youare seeking to create something quickly, conditions are adverse, oryou are seeking to invent or create a high-quality item.Often Trade Tests of this type are extended Test, with the SL andtime required depending upon the scope or scale of what is beingproduced; a quick meal with Trade (Cook) to impress a local lordwill take far less time than constructing a warship with Trade(Shipwright).You may also make a Trade Test as a Lore Skill, to determineinformation relevant to the trade in question. In suchcircumstances, the GM may prefer to use Int over Dex as the baseCharacteristic, though often this is ignored to keep play simple.While most Trade Skills have little function in combat, thereare as many Trade Skills as there are trades, and some maybe of use depending upon the circumstances. For example, asuccessful Trade (Apothecary) Test may be useful if fighting inan Apothecary’s shop as you identify some astringent chemicalsto hurl at your foes.The Trade Skill is also used for enacting a Crafting Endeavour(see page 197).", false, ["Apothecary", "Calligrapher", "Chandler", "Carpenter", "Cook", "Embalmer", "Smith", "Tanner"], "Tanner", 0)
        ];
        return skills;
    }

    static generateFromString(dataString) {
        var data = dataString.split("@");

        var name = data[0];
        var stat = data[1];
        var descritption = data[2];
        var basic = data[3] == "true" ? true : false;

        var specialistions = (data[4].trim() == "") ? [] : data[4].split("}");
        var specialistion = data[5];
        var advancments = parseInt(data[6]);

        return new Skill(name, stat, descritption, basic, specialistions, specialistion, advancments);
    }

    toString() {
        var str = this.name + "@" + this.stat + "@" + this.description + "@" + this.basic.toString() + "@";

        for (var i = 0; i < this.specialistions.length; i++) {
            str += this.specialistions[i] + ((i == this.specialistions.length - 1) ? "" : "}");
        }

        str += "@";

        str += this.specialistion + "@" + this.advancments.toString();

        return str;
    }

    toHtml(character) {
        var str = "<div class=\"skillWindow\"><h3>" + this.getName() + "</h3>";
        str += this.description + "<br>";

        if (this.specialistions.length > 0) {
            str += "<br><b>Specialisations: </b>"
            for (var i = 0; i < this.specialistions.length; i++) {
                str += this.specialistions[i] + ((this.specialistions.length - 1 == i) ? "<br>" : ", ")
            }
        }


        console.log(str);
        if (character == null)
            return str + "</div>";

        var relatedTalents = character.getRelatedTalents(this);
        if (relatedTalents.length > 0) {
            str += "<br><br><b>Related talents: </b>"
            for (var i = 0; i < this.relatedTalents.length; i++) {
                str += this.relatedTalents[i].name + ((this.relatedTalents.length - 1 == i) ? "<br>" : ", ")
            }
        }

        console.log(str);
        return str + "</div>";
    }

    static compareSkills(a, b) {
        return a.getName().localeCompare(b.name);
    }

    static advanceSkillArrayToHtml(character) {
        var sk = character.getAdvanceSkills();
        sk = sk.sort(Skill.compareSkills);

        var str = "<div class=\"skillArrayWindow\"><table>";

        for (var i = 0; i < sk.length; i++) {
            var q = "<tr onmouseleave=\"hoverStop()\" onmousemove=\"hoverStart(event,'" + sk[i].toHtml(character).replaceAll("\"", "$") + "')\"><th>" + sk[i].getName() + "</th><th>" + sk[i].stat + "</th><th>" + character.getStat(sk[i].stat) + "</th><th>" + sk[i].advancments + "</th><th>" + (character.getStat(sk[i].stat) + sk[i].advancments) + "</th></tr>";
            str += q;
        }

        str += "</table></div>";

        return str;

    }

    static basicSkillArrayToHtml(character) {

        var sk = character.getBasicSkills();

        var strings = [];
        //var 

        for (var i = 0; i < sk.length; i++) {
            if (sk[i].specialistions.length == 0) {
                strings.push(sk[i]);
            }
            else {
                var allOfThose = [];
                allOfThose.push(sk.splice(i, 1)[0]);

                for (var j = i; j < sk.length; j++) {
                    if (allOfThose[0].name == sk[j].name) {
                        allOfThose.push(sk.splice(j, 1)[0]);
                        j--;
                    }
                }

                var baseSpec = Skill.getFromDatabase(allOfThose[0].name)[0].specialistions;

                for (var j = 0; j < allOfThose.length; j++) {
                    for (var k = 0; k < baseSpec.length; k++) {
                        if (!allOfThose[j].specialistions.includes(baseSpec[k])) {
                            var temp = allOfThose.splice(j, 1)[0];
                            strings.push(temp);
                            j--;
                            break;
                        }
                    }
                }

                if (allOfThose.length == 0)
                    continue;

                var lowestAdv = allOfThose[0].advancments;
                var name = allOfThose[0].name;
                var desc = allOfThose[0].description;
                var stat = allOfThose[0].stat;
                for (var j = 0; j < allOfThose.length; j++) {
                    if (lowestAdv > allOfThose[j].advancments) {
                        lowestAdv = allOfThose[j].advancments;
                    }
                }


                for (var j = 0; j < allOfThose.length; j++) {
                    if (allOfThose[j].advancments > lowestAdv) {
                        var temp = allOfThose.splice(j, 1)[0];
                        strings.push(temp);
                        j--;
                    }
                }

                var amalg;

                if (allOfThose.length > 1)
                    amalg = new Skill(name, stat, desc, true, baseSpec, "", lowestAdv);
                else
                    amalg = allOfThose[0];
                strings.push(amalg);
            }
        }

        strings = strings.sort(Skill.compareSkills);

        var str = "<div class=\"skillArrayWindow\"><table>";

        for (var i = 0; i < strings.length; i++) {
            var q = "<tr onmouseleave=\"hoverStop()\" onmousemove=\"hoverStart(event,'" + strings[i].toHtml(character).replaceAll("\"", "$") + "')\"><th>" + strings[i].getName() + "</th><th>" + strings[i].stat + "</th><th>" + character.getStat(strings[i].stat) + "</th><th>" + strings[i].advancments + "</th><th>" + (character.getStat(strings[i].stat) + strings[i].advancments) + "</th></tr>";
            str += q;
        }

        str += "</table></div>";

        return str;
    }
}
//#endregion

//#region Trappings
////////////////////////////////////////////////////////////////////////////////////
//Trappings
////////////////////////////////////////////////////////////////////////////////////

class Trapping {//String breakers: '@', '}', '£'
    constructor(name, price, enc, availability, description, type, qualities) {
        this.name = name;//string
        this.price = price;//int (in coppers)
        this.enc = enc;//int
        this.availability = availability;//string
        this.description = description;//string
        this.type = type;//string
        this.qualities = qualities;//[string]
    }

    equals(other) {
        return true;
    }

    static getFromDatabase(name) {
        return new Trapping("temp", 1, 1, "temp", "temp", "temp", []);
    }

    static generateFromString(dataString) {
        var data = dataString.split("@");

        var name = data[0];
        var price = parseInt(data[1]);
        var enc = parseInt(data[2]);
        var avail = data[3];
        var description = data[4];
        var type = data[5];
        var qualities = data[6].split("}");

        switch (type) {
            case "Container":
                var carries = parseInt(data[7]);

                var containsData = data[8].split("£");
                var contains = [];
                for (var i = 0; i < containsData.length; i++) {
                    contains.push(Trapping.generateFromString(containsData[i]));
                }

                return new Container(name, price, enc, avail, description, type, qualities, carries, contains);

            default:
                return new Trapping(name, price, enc, avail, description, type, qualities);
        }
    }

    toString() {
        var str = this.name + "@" + this.price.toString() + "@" + this.enc.toString() + "@" + this.availability + "@" + this.description + "@" + this.type + "@";

        for (var i = 0; i < this.qualities.length; i++) {
            str += this.qualities[i] + (i == this.qualities.length - 1) ? "" : "}";
        }

        return str;
    }
}

class Container extends Trapping {
    constructor(name, price, enc, availability, description, type, qualities, carries, contains) {
        super(name, price, enc, availability, description, type, qualities);
        this.carries = carries;//int
        this.contains = contains;//[trapping]
    }

    toString() {
        var str = super.toString() + "@" + this.carries;

        for (var i = 0; i < this.trappings.length; i++) {
            str += this.trappings[i].toString() + (i == this.trappings.length - 1) ? "" : "£";
        }

        return str;
    }
}
//#endregion

//#region Career
////////////////////////////////////////////////////////////////////////////////////
//Career
////////////////////////////////////////////////////////////////////////////////////

class Career { //String breakers: '#', '[', '{'
    constructor(name, description, subNames, statuses, statMatrix, skillMatrix, talentMatrix, trappingMatrix, level, careerType) {
        this.name = name; //String
        this.description = description; //String
        this.subNames = subNames; //[String]
        this.statuses = statuses; //[String]
        this.statMatrix = statMatrix; //[[string]]


        for (var i = 0; i < skillMatrix.length; i++) {
            var s = [];
            for (var j = 0; j < skillMatrix[i].length; j++) {
                s = s.concat(skillMatrix[i][j]);
            }
            skillMatrix[i] = s;
        }

        this.skillMatrix = skillMatrix; //[[skill]]

        for (var i = 0; i < talentMatrix.length; i++) {
            var s = [];
            for (var j = 0; j < talentMatrix[i].length; j++) {
                s = s.concat(talentMatrix[i][j]);
            }
            talentMatrix[i] = s;
        }
        this.talentMatrix = talentMatrix; //[[talent]]
        this.trappingMatrix = trappingMatrix; //[[trapping]]
        this.level = level; //int
        this.careerType = careerType; //string
    }

    equals(other) {
        if (this.name != other.name)
            return false;
        if (this.description != other.description)
            return false;
        if (this.level != other.level)
            return false;
        if (this.careerType != other.careerType)
            return false;

        if (this.subNames.length != other.subNames.length)
            return false;
        for (var i = 0; i < this.subNames.length; i++) {
            if (this.subNames[i] != other.subNames[i]) {
                return false;
            }
        }


        if (this.statuses.length != other.statuses.length)
            return false;
        for (var i = 0; i < this.statuses.length; i++) {
            if (this.statuses[i] != other.statuses[i]) {
                return false;
            }
        }



        if (this.skillMatrix.length != other.skillMatrix.length)
            return false;
        for (var i = 0; i < this.skillMatrix.length; i++) {
            if (this.skillMatrix[i].length != other.skillMatrix[i].length) {
                return false;
            }
            for (var j = 0; j < this.skillMatrix[i].length; j++) {
                if (this.skillMatrix[i][j].length != other.skillMatrix[i][j].length) {
                    return false;
                }
                for (var k = 0; k < this.skillMatrix[i][j].length; k++) {
                    if (!this.skillMatrix[i][j][k].equals(other.skillMatrix[i][j][k])) {
                        return false;
                    }
                }
            }
        }

        if (this.talentMatrix.length != other.talentMatrix.length)
            return false;
        for (var i = 0; i < this.talentMatrix.length; i++) {
            if (this.talentMatrix[i].length != other.talentMatrix[i].length) {
                return false;
            }
            for (var j = 0; j < this.talentMatrix[i].length; j++) {
                if (!this.talentMatrix[i][j].equals(other.talentMatrix[i][j])) {
                    return false;
                }
            }
        }


        if (this.trappingMatrix.length != other.trappingMatrix.length)
            return false;
        for (var i = 0; i < this.trappingMatrix.length; i++) {
            if (this.trappingMatrix[i].length != other.trappingMatrix[i].length) {
                return false;
            }
            for (var j = 0; j < this.trappingMatrix[i].length; j++) {
                if (!this.trappingMatrix[i][j].equals(other.trappingMatrix[i][j])) {
                    return false;
                }
            }
        }

        return true;
    }

    getAvailableSkills() {
        var ret = [];
        for (var i = 0; i < this.level + 1; i++) {
            ret = ret.concat(this.skillMatrix[i])
        }

        return ret;
    }

    getAvailableTalents() {
        var ret = [];
        for (var i = 0; i < this.level + 1; i++) {
            ret = ret.concat(this.talentMatrix[i])
        }

        var ret2 = [];
        for (var i = 0; i < ret.length; i++) {
            ret2 = ret2.concat(ret[i]);
        }

        return ret2;
    }

    static getRandomCareer(likelyhood) {
        if (likelyhood.length != 64)
            console.log("Whoow your array is outa wack brah");

        var cars = this.getAllCareers();

        var roll = rand(1, 101);
        var acc = 0;
        for (var i = 0; i < likelyhood.length; i++) {
            acc += likelyhood[i];
            if (acc >= roll)
                return cars[i];
        }

        console.log(roll);
        console.log("Really should get a handle on this getCareer thing, tsk, tsk, tsk");
    }

    static getAllCareers() {
        var careers = [
            new Career("Apothecary", "Apothecaries specialise in preparing pharmaceutical medication — commonly pills, draughts, and ointments — for sale to patients and doktors alike. Their workshops are filled with a dazzling array of bubbling alembics, overflowing beakers, worn mortar and pestles, and other physic-making paraphernalia. Some Apothecaries supplement their income selling illicit substances — from stimulants for desperate students, to hallucinogenic weirdroot for bored nobles or shady commissions from even shadier groups. Supplying these is lucrative, but also dangerous. Rare ingredients are expensive, so Apothecaries frequently have cash flow problems, and journey the wilds to collect their own ingredients. Many take temporary employment with expeditions, mercenaries, or the military for extra coin.", ["Apothecary’s Apprentice", "Apothecary", "Master Apothecary", "Apothecary-General"], ["Brass 3", "Silver 1", "Silver 3", "Gold 1"], [["T", "Dex", "Int"], ["Fel"], ["I"], ["WP"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Lore (Chemistry)"), Skill.getFromDatabase("Lore (Medicine)"), Skill.getFromDatabase("Lore (Plants)"), Skill.getFromDatabase("Trade(Apothecary)"), Skill.getFromDatabase("Trade (Poisoner)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Science)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Language(Guilder)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Research"), Skill.getFromDatabase("Secret Signs(Guilder)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Ride (Horse)")]], [[Talent.getFromDatabase("Concoct"), Talent.getFromDatabase("Craftsman (Apothecary)"), Talent.getFromDatabase("Etiquette (Scholars)"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Pharmacist")], [Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Master Tradesman (Apothecary)"), Talent.getFromDatabase("Resistance (Poison)"), Talent.getFromDatabase("Savvy")], [Talent.getFromDatabase("Acute Sense (Taste)"), Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Master Tradesman (Poisoner)"), Talent.getFromDatabase("Savant (Apothecary)")]], [[Trapping.getFromDatabase("Book (Blank)"), Trapping.getFromDatabase("Healing Draught"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Pestle and Mortar")], [Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Trade Tools")], [Trapping.getFromDatabase("Book (Apothecary)"), Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Workshop")], [Trapping.getFromDatabase("Commission Papers"), Trapping.getFromDatabase("Large Workshop")]], 0, "Academics"),
            new Career("Engineer", "Engineers design and build mechanical devices or structures such as bridges, canals, or fortifications. Most are educated, Dwarfs at the hide-bound Dwarf Engineers Guild, Humans at forward-thinking establishments such as the Imperial Engineers’ School at Altdorf, though self-taught prodigies are not unknown. Human Engineers value innovation and discovery, whereas Dwarfs favour traditional, triedand- tested designs passed down for generations. Mining company engineers are well-paid; less so the State Army Engineers who maintain the Imperial war machines and act as sappers and bridge-builders. Master Engineers often find themselves leading teams on ambitious construction projects. Chartered Engineers are the most trusted in the Empire, called upon to design, test, and build such prestigious Imperial Commissions like the complex Steam Wheel Locks, which have revolutionised the speed of travel in the canals of the Vorbergland.", ["Student Engineer", "Engineer", "Master Engineer", "Chartered Engineer"], ["Brass 4", "Silver 2", "Silver 4", "Gold 2"], [["BS", "Dex", "Int"], ["I"], ["T"], ["WP"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Language(Classical)"), Skill.getFromDatabase("Lore (Engineer)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged(Blackpowder)"), Skill.getFromDatabase("Trade (Engineer)")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ranged (Engineering)"), Skill.getFromDatabase("Research"), Skill.getFromDatabase("Language (Guilder)")], [Skill.getFromDatabase("Language (Khazalid)"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Ride(Horse)"), Skill.getFromDatabase("Secret Signs (Guilder)")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Artistic"), Talent.getFromDatabase("Gunner"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Tinker")], [Talent.getFromDatabase("Craftsman (Engineer)"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Orientation")], [Talent.getFromDatabase("Etiquette (Scholar)"), Talent.getFromDatabase("Master Tradesman (Engineering)"), Talent.getFromDatabase("Sniper"), Talent.getFromDatabase("Super Numerate")], [Talent.getFromDatabase("Magnum Opus"), Talent.getFromDatabase("Rapid Reload"), Talent.getFromDatabase("Savant (Engineering)"), Talent.getFromDatabase("Unshakeable")]], [[Trapping.getFromDatabase("Book (Engineer)"), Trapping.getFromDatabase("Hammer and Spikes")], [Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Trade Tools")], [Trapping.getFromDatabase("Workshop")], [Trapping.getFromDatabase("Guild License"), Trapping.getFromDatabase("Library (Engineer)"), Trapping.getFromDatabase("Quality Trade Tools (Engineer)"), Trapping.getFromDatabase("Large Workshop (Engineer)")]], 0, "Academics"),
            new Career("Lawyer", "Lawyers give legal counsel, interpret the law, and argue on behalf of their clients before the courts. They are often specialists in the laws of the province in which they practice, or in ecclesiastical law. Most are university educated and therefore rich and well-connected, although gifted individuals of low birth are sometimes apprenticed. Cult lawyers learn from their venerable peers, with those trained by the Cults of Verena and Sigmar especially well-regarded. Some Lawyers are hired as mediators, settling informal disputes outside costly courts, a practice favoured by Halflings. Others work for criminal gangs, exploiting legal loopholes to free their always-guilty clients. At the top end of society, Barristers are the only lawyers allowed to address higher appeal courts in the city-states, charging exorbitant prices for their services.", ["Student Lawyer", "Lawyer", "Barrister", "Judge"], ["Brass 4", "Silver 3", "Gold 1", "Gold 2"], [["I", "Dex", "Int"], ["Fel"], ["WP"], ["T"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Language(Classical)"), Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Lore (Theology)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Research")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Guilder)"), Skill.getFromDatabase("Secret Signs (Guilder)")], [Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Entertain (Speeches)"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (Any)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Etiquette (Scholar)"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Speedreader")], [Talent.getFromDatabase("Argumentative"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Impassioned Zeal"), Talent.getFromDatabase("Savvy")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Savant (Law)"), Talent.getFromDatabase("Wealthy")]], [[Trapping.getFromDatabase("Book (Law)"), Trapping.getFromDatabase("Magnifying Glass")], [Trapping.getFromDatabase("Court Robes"), Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Writing Kit")], [Trapping.getFromDatabase("Office"), Trapping.getFromDatabase("Assistant (Student or Servant)")], [Trapping.getFromDatabase("Gavel"), Trapping.getFromDatabase("Ostentatious Wig")]], 0, "Academics"),
            new Career("Nun", "Nuns are members of religious orders, normally cloistered within an abbey, convent, or monastery. Most rise before the sun for morning prayer before toiling in fields, tending to the sick, or preserving important manuscripts. Vows of pilgrimage cause some to travel the Empire, while others take oaths to serve the community, moving amongst the people, tending to their spiritual needs. Devoted hermits and tenders to shrines are also thought of as ‘Nuns’ or ‘Monks’ by the folk of the Empire. Many Nuns learn valuable trades such as vintners, brewers or calligraphers. Abbesses use these activities to attract donations and patronage from the local nobility. Leaders of particularly large or martial Orders can gather significant influence both within their own cult and with the ruling classes of a province. For more on religion and the different Orders, see Chapter 7: Religion and Belief.", ["Novitiate", "Nun", "Abbess", "Prioress General"], ["Brass 1", "Brass 4", "Silver 2", "Silver 5"], [["Fel", "Dex", "Int"], ["WP"], ["I"], ["T"]], [[Skill.getFromDatabase("Art (Calligraphy)"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain(Storytelling)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore (Theology)"), Skill.getFromDatabase("Pray")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Research"), Skill.getFromDatabase("Trade (Brewer)"), Skill.getFromDatabase("Trade(Herbalist)"), Skill.getFromDatabase("Trade (Vintner)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Bless (Any)"), Talent.getFromDatabase("Stone Soup"), Talent.getFromDatabase("Panhandle"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Etiquette (Cultists)"), Talent.getFromDatabase("Field Dressing"), Talent.getFromDatabase("Holy Visions"), Talent.getFromDatabase("Invoke (Any)")], [Talent.getFromDatabase("Resistance (Any)"), Talent.getFromDatabase("Robust"), Talent.getFromDatabase("Savant (Theology)"), Talent.getFromDatabase("Stout-hearted")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Pure Soul"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("Religious Symbol"), Trapping.getFromDatabase("Robes")], [Trapping.getFromDatabase("Book (Religion)"), Trapping.getFromDatabase("Religious Relic"), Trapping.getFromDatabase("Trade Tools(Any)")], [Trapping.getFromDatabase("Abbey"), Trapping.getFromDatabase("Library (Theology)")], [Trapping.getFromDatabase("Religious Order")]], 0, "Academics"),
            new Career("Physician", "Physicians study patients’ symptoms and prescribe remedies and surgeries. While the healing arts are ancient, many deriving from Elven practices, the formal science of medicine is relatively new and not-entirely-trusted. Due to the Empire’s history with necromancy and the safe-guards imposed by the Cult of Morr, studying cadavers is forbidden, making learning of anatomy hard. Medicine’s reputation suffered further from swindlers selling ‘miracle cure-alls’ that do nothing or cause actual harm. Physicians learn their profession at a university or while apprenticed to a Guild Physician. Most cheap surgery is undertaken by back-street physicians known as barber-surgeons whose training is informal. Trained doctors with strong stomachs are in demand for the State Armies. The most famed Physicians almost exclusively tend to wealthy merchants and the nobility.", ["Physician’s Apprentice", "Physician", "Doktor", "Court Physician"], ["Brass 4", "Silver 3", "Silver 5", "Gold 1"], [["WP", "Dex", "Int"], ["Fel"], ["I"], ["Ag"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Language (Guilder)"), Skill.getFromDatabase("Lore(Anatomy)"), Skill.getFromDatabase("Lore (Medicine)"), Skill.getFromDatabase("Trade (Barber)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Research")], [Skill.getFromDatabase("Lore (Noble)"), Skill.getFromDatabase("Perform (Dancing)")]], [[Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Field Dressing"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Surgery")], [Talent.getFromDatabase("Etiquette (Scholars)"), Talent.getFromDatabase("Resistance (Disease)"), Talent.getFromDatabase("Savvy"), Talent.getFromDatabase("Strike to Injure")], [Talent.getFromDatabase("Etiquette (Nobles)"), Talent.getFromDatabase("Nimble Fingered"), Talent.getFromDatabase("Savant (Medicine)"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("Bandages"), Trapping.getFromDatabase("Healing Draught")], [Trapping.getFromDatabase("Book (Medicine)"), Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Trade Tools (Medicine)")], [Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Workshop (Medicine)")], [Trapping.getFromDatabase("Courtly Attire"), Trapping.getFromDatabase("Letter of Appointment")]], 0, "Academics"),
            new Career("Priest", "Priests tend to congregations of the faithful throughout the Old World. While many are assigned to a specific temple, others choose a wandering life to reach worshippers who cannot, or will not, attend temple. They are expected to exemplify the beliefs of their religion — which vary greatly depending on which deity they serve. High Priests are responsible for a temple and all its Cult and lay members. Alongside Lectors, they will often be called upon to advise the ruling classes, with many active in local politics. Priests have many duties connected to their God, such as Priests of Manann’s responsibility to consecrate new ships, or a Shallyan’s duty to tend to the sick and wounded, so they touch on most aspects of life in the Empire. For more on religion and the different Orders, see Chapter 7: Religion and Belief.", ["Initiate", "Priest", "High Priest", "Lector"], ["Brass 2", "Silver 1", "Gold 1", "Gold 2"], [["T", "Ag", "WP"], ["Fel"], ["Int"], ["I"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Theology)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Pray"), Skill.getFromDatabase("Research")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Entertain (Speeches)"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Heraldry)")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Politics)")]], [[Talent.getFromDatabase("Bless (Any)"), Talent.getFromDatabase("Holy Visions"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Etiquette (Cultists)"), Talent.getFromDatabase("Invoke (Any)")], [Talent.getFromDatabase("Acute Sense (Any)"), Talent.getFromDatabase("Hatred (Any)"), Talent.getFromDatabase("Impassioned Zeal"), Talent.getFromDatabase("Strong-minded")], [Talent.getFromDatabase("Master Orator"), Talent.getFromDatabase("Pure Soul"), Talent.getFromDatabase("Resistance (Any)"), Talent.getFromDatabase("Savant (Theology)")]], [[Trapping.getFromDatabase("Religious Symbol"), Trapping.getFromDatabase("Robes")], [Trapping.getFromDatabase("Book (Religion)"), Trapping.getFromDatabase("Ceremonial Robes")], [Trapping.getFromDatabase("Quality Robes"), Trapping.getFromDatabase("Religious Relic"), Trapping.getFromDatabase("Subordinate Priests"), Trapping.getFromDatabase("Temple")], [Trapping.getFromDatabase("Library (Theology)"), Trapping.getFromDatabase("Subordinate High Priests")]], 0, "Academics"),
            new Career("Scholar", "Scholars generally study at one of the Old World’s learning institutions, foremost amongst them the university in Altdorf. Most specialise in one or two subjects, and many learn just enough to provide a useful career, or give them something to talk about at dinner parties. Poorer Scholars act as scribes, reading and writing notes for others as most of the Empire’s citizens are illiterate. Others become tutors educating the wealthy. The most gifted Masters are invited to join a university, with renowned Professors delivering popular lectures to hundreds of Students. Dwarfs and High Elves are less likely to be employed in an Imperial institution, though they may tour the Empire in search of esoteric knowledge.", ["Student", "Scholar", "Fellow", "Professor"], ["Brass 3", "Silver 2", "Silver 5", "Gold 1"], [["T", "WP", "Int"], ["I"], ["Fel"], ["Dex"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Lore(Any)"), Skill.getFromDatabase("Research")], [Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Trade (Any)")], [Skill.getFromDatabase("Entertain (Lecture)"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)")], [Skill.getFromDatabase("Entertain (Rhetoric)"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Savvy"), Talent.getFromDatabase("Super Numerate")], [Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Etiquette (Scholars)"), Talent.getFromDatabase("Speedreader"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Linguistics"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Savant (Any)"), Talent.getFromDatabase("Tower of Memories")], [Talent.getFromDatabase("Magnum Opus"), Talent.getFromDatabase("Master Orator"), Talent.getFromDatabase("Savant (Any)"), Talent.getFromDatabase("Sharp")]], [[Trapping.getFromDatabase("Alcohol"), Trapping.getFromDatabase("Book"), Trapping.getFromDatabase("Opinions"), Trapping.getFromDatabase("Writing Kit")], [Trapping.getFromDatabase("Access to a Library"), Trapping.getFromDatabase("Degree")], [Trapping.getFromDatabase("Mortarboard"), Trapping.getFromDatabase("Robes")], [Trapping.getFromDatabase("Study")]], 0, "Academics"),
            new Career("Wizard", "Wizards channel one of the eight ‘Winds of Magic’ only spellcasters perceive, to cast potent spells. To legally cast magic in the Empire, a Human must follow the Articles of Imperial Magic and belong to one of the Eight Colleges of Magic in Altdorf — each dedicated to a specific wind, as Magisters can only safely channel one. After graduation, Apprentices become Magisters and serve the Empire. Magisters carefully study and practice their art, which, according to the Articles, they can only use outside their colleges in defence of their own life, or against the enemies of the Empire. Many Magisters are attached to the Empire State Army, and although they are treated with cautious suspicion, none can deny their effectiveness on the battlefield.", ["Wizard’s Apprentice", "Wizard", "Master Wizard", "Wizard Lord"], ["Brass 3", "Silver 3", "Gold 1", "Gold 2"], [["WS", "WP", "Int"], ["Ag"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Channelling (Any Colour)"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Magick)"), Skill.getFromDatabase("Lore (Magick)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Melee (Pole-arm)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (Battle Tongue)"), Skill.getFromDatabase("Language (Any)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Lore (Warfare)"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Aethyric Attunement"), Talent.getFromDatabase("Petty Magic"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Second Sight")], [Talent.getFromDatabase("Arcane Magic (Any)"), Talent.getFromDatabase("Detect Artefact"), Talent.getFromDatabase("Fast Hands"), Talent.getFromDatabase("Sixth Sense")], [Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Instinctive Diction"), Talent.getFromDatabase("Magical Sense"), Talent.getFromDatabase("Menacing")], [Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("War Wizard")]], [[Trapping.getFromDatabase("Grimoire"), Trapping.getFromDatabase("Staff")], [Trapping.getFromDatabase("Magical License")], [Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Light Warhorse"), Trapping.getFromDatabase("Magical Item")], [Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Library (Magic)"), Trapping.getFromDatabase("Workshop (Magic)")]], 0, "Academics"),

            new Career("Agitator", "Agitators lobby for political causes using print, protest, and Public Speaker. They muster the down-trodden populace’s sympathy and support but must be wary of drawing the attention of Sigmarites or Dwarfs interested in maintaining established traditions. The most dangerous Agitators have destabilised the rule of nobles, towns, and even entire provinces. Pamphleteers nail signs to billboards, or distribute them in market squares, though often those they seek to reach cannot read. Religious Agitators can make a good living as street preachers, receiving donations from pious devotees and attracting flagellants and zealots as followers. Agitators who survive long enough to become Demagogues are often supported by powerful, hidden allies pursuing change for their own motives.", ["Pamphleteer", "Agitator", "Rabble Rouser", "Demagogue"], ["Brass 1", "Brass 2", "Brass 3", "Brass 5"], [["BS", "Fel", "Int"], ["Ag"], ["WS"], ["I"]], [[Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Trade (Printing)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Ride (Horse)")]], [[Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Panhandle"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Argumentative"), Talent.getFromDatabase("Impassioned Zeal"), Talent.getFromDatabase("Public Speaker")], [Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Step Aside")], [Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Master Orator"), Talent.getFromDatabase("Schemer"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Writing Kit"), Trapping.getFromDatabase("Hammer and Nails"), Trapping.getFromDatabase("Pile of Leaflets")], [Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Pamphleteer")], [Trapping.getFromDatabase("3 Pamphleteers"), Trapping.getFromDatabase("Patron"), Trapping.getFromDatabase("Printing Press"), Trapping.getFromDatabase("Impressive Hat")]], 0, "Burghers"),
            new Career("Artisan", "Artisans produce goods, ranging from everyday necessities sold by Bakers and Chandlers, to weapons and riverboats crafted by Smiths and Shipwrights. The Empire’s larger towns and cities have guilds to protect local Artisans from fraudsters, as an Artisan’s entire livelihood can be jeopardised by unskilled competitors hawking cheap low-quality merchandise. Guild Artisans observe strict quality standards, with those failing to meet them blackballed and forbidden to trade locally. Artisans work at all levels of society not just producing goods, but also repairing them. They are employed by navies to maintain vessels, by armies to manage war machines and siegeworks, and by merchant houses of all sizes to transform raw materials into sellable goods.", ["Apprentice Artisan", "Artisan", "Master Artisan", "Guildmaster"], ["Brass 2", "Silver 1", "Silver 3", "Gold 1"], [["S", "T", "Dex"], ["Fel"], ["WP"], ["Int"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Stealth (Urban)"), Skill.getFromDatabase("Trade (Any)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Language(Guilder)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Research"), Skill.getFromDatabase("Secret Signs (Guilder)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Intimidate")]], [[Talent.getFromDatabase("Artistic"), Talent.getFromDatabase("Craftsman (any)"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Nimble Fingered"), Talent.getFromDatabase("Sturdy")], [Talent.getFromDatabase("Acute Sense (Touch)"), Talent.getFromDatabase("Acute Sense (Taste)"), Talent.getFromDatabase("Master Tradesman (Any)"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Tinker")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Magnum Opus"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Schemer")]], [[Trapping.getFromDatabase("Chalk"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("d10 rags")], [Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Trade Tools")], [Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Workshop")], [Trapping.getFromDatabase("Guild"), Trapping.getFromDatabase("Quality Clothing")]], 0, "Burghers"),
            new Career("Beggar", "The countryside rumour that Altdorf ’s streets are lined with gold is a cruel taunt to its Beggars. They rely upon the generosity of strangers and scraps scavenged from the mud and detritus of city life, though posturing dandies will happily dispose of a few pfennigs to make them go away. The law affords them little protection and the watch has no sympathy for loiterers. Paupers often land on the streets as orphans and have been in and out of Mercy Houses all their lives. Once the basic skills of scrounging and panhandling are learned, Beggars can advance their techniques using disguises and sympathy ploys. Other Paupers are not destitute but simply employed in some of the worst occupations, on the lowest rung of the social ladder, like Gong Farmers, Bone Pickers, and Rag and Bone Men.", ["Pauper", "Beggar", "Master Beggar", "Beggar King"], ["Brass 0", "Brass 2", "Brass 4", "Silver 2"], [["T", "Ag", "Fel"], ["WP"], ["WS"], ["I"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Stealth (Urban)")], [Skill.getFromDatabase("Entertain (Acting)"), Skill.getFromDatabase("Entertain (Any)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Secret Signs (Vagabond)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Intimidate")]], [[Talent.getFromDatabase("Panhandle"), Talent.getFromDatabase("Resistance (Disease)"), Talent.getFromDatabase("Stone Soup"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Beneath Notice"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Criminals)")], [Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Step Aside")], [Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Fearless (Watchmen)"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Poor Quality Blanket"), Trapping.getFromDatabase("Cup")], [Trapping.getFromDatabase("Crutch"), Trapping.getFromDatabase("Bowl")], [Trapping.getFromDatabase("Disguise Kit"), Trapping.getFromDatabase("Hiding Place"), Trapping.getFromDatabase("Pauper Follower")], [Trapping.getFromDatabase("Lair"), Trapping.getFromDatabase("Large Group of Beggar Followers")]], 0, "Burghers"),
            new Career("Investigator", "Most Investigators pursue cases involving stolen property, missing persons, or murders, although some research stories for the emerging newssheets, or even blackmail crime suspects for ‘hush money’. Investigative techniques include footprint tracking, crossexamination, deductive reasoning and — if necessary — breaking and entry. Where secular investigators operate on the edge of the law or for an institution like the watch of a Merchant House, religious investigators — most commonly serving Sigmar and Verena — follow stricter ethical codes. Some experienced Investigators cultivate matter-of-fact airs of sophistication to improve their credibility. While Master Investigators often sell themselves as ‘observation specialists’ possessing skills they claim cannot be learned. Considerable self-promotion is required to become one of the famous Detectives who receive job offers from across the Old World.", ["Sleuth", "Investigator", "Master Investigator", "Detective"], ["Silver 1", "Silver 2", "Silver 3", "Silver 5"], [["I", "Ag", "Int"], ["Fel"], ["Dex"], ["WP"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Urban)"), Skill.getFromDatabase("Track")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Pick Lock"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Any)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (any)")]], [[Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Beneath Notice"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Sharp")], [Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Savvy"), Talent.getFromDatabase("Shadow"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Bookish"), Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Acute Sense (Any)"), Talent.getFromDatabase("Savant (Any)"), Talent.getFromDatabase("Speedreader"), Talent.getFromDatabase("Tower of Memories")]], [[Trapping.getFromDatabase("Lantern"), Trapping.getFromDatabase("Lamp Oil"), Trapping.getFromDatabase("Journal"), Trapping.getFromDatabase("Quill and Ink")], [Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Magnifying Glass"), Trapping.getFromDatabase("Lockpick")], [Trapping.getFromDatabase("Assistant"), Trapping.getFromDatabase("Office")], [Trapping.getFromDatabase("Network of Informants"), Trapping.getFromDatabase("Spyglass")]], 0, "Burghers"),
            new Career("Merchant", "Most Merchants trade in simple goods such as alcohol, textiles, woodcraft, and pottery. For the ambitious, rare exotic goods such as Dwarf gromril or Eastern spices command higher profits, but risk longer transport routes and require strong foreign contacts. Merchants cannot sell in most towns without approval from (and payments to) a Merchants’ Guild, powerful institutions rivalling the noble courts in political influence. Local commerce is managed by Traders who ship goods between backwater villages and nearby towns. Traders can join guilds by apprenticing under Master Merchants as junior business partners. Powerful Merchant Princes owning warehouses and sales offices in multiple cities enjoy the same status as minor nobles. In addition to trading, some Merchants also branch out into banking, moneylending, and investing.", ["Trader", "Merchant", "Master Merchant", "Merchant Prince"], ["Silver 2", "Silver 5", "Gold 1", "Gold 3"], [["WS", "Ag", "Fel"], ["Int"], ["I"], ["WP"]], [[Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle")], [Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Language(Guilder)"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Secret Signs(Guilder)")], [Skill.getFromDatabase("Lore (Any)"), Skill.getFromDatabase("Intimidate")]], [[Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Savvy")], [Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Sharp")], [Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Luck"), Talent.getFromDatabase("Schemer"), Talent.getFromDatabase("Wealthy")]], [[Trapping.getFromDatabase("Abacus"), Trapping.getFromDatabase("Mule and Cart"), Trapping.getFromDatabase("Canvas Tarpaulin"), Trapping.getFromDatabase("3d10 Silver Shillings")], [Trapping.getFromDatabase("Riverboat or 2 Wagons"), Trapping.getFromDatabase("Guild License"), Trapping.getFromDatabase("20 GC")], [Trapping.getFromDatabase("Town House with Servants"), Trapping.getFromDatabase("Warehouse"), Trapping.getFromDatabase("100 GC")], [Trapping.getFromDatabase("2 Riverboats or 4 Wagons"), Trapping.getFromDatabase("Large Town Estate"), Trapping.getFromDatabase("2 Warehouses"), Trapping.getFromDatabase("1000 GC"), Trapping.getFromDatabase("Quality Clothing")]], 0, "Burghers"),
            new Career("Rat Catcher", "Rat Catchers patrol every town and city, and for good reason. The Empire’s streets are clogged with food scraps and foulness, perfect breeding grounds for vermin. Rat Catchers earn their crusts by killing these rats, clearing their nests from cellars, and by delving the Empire’s hopelessly infested sewer systems… provided they’re brave enough to face the other things down there. When apprenticed, Rat Catchers usually adopt a stray puppy that they train for ratting. The toughest Rat Catchers are hired by towns as Sewer Jacks to hunt giant rats and other subterranean nasties. On rare occasions, entire towns are overrun and later reclaimed with the aid of Exterminators.", ["Rat Hunter", "Rat Catcher", "Sewer Jack", "Exterminator"], ["Brass 3", "Silver 1", "Silver 2", "Silver 3"], [["WS", "BS", "WP"], ["T"], ["I"], ["S"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Animal Training (Dog)"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Ranged (Sling)"), Skill.getFromDatabase("Stealth (Underground or Urban)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Poison)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Set Trap")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Ranged (Crossbow Pistol)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Track")]], [[Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Resistance (Disease)"), Talent.getFromDatabase("Strike Mighty Blow"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Enclosed Fighter"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Fearless (Rats)"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Stout-hearted"), Talent.getFromDatabase("Strong Legs"), Talent.getFromDatabase("Tunnel Rat")], [Talent.getFromDatabase("Fearless (Skaven)"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Robust"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("Sling with Ammunition"), Trapping.getFromDatabase("Sack"), Trapping.getFromDatabase("Small but Vicious Dog")], [Trapping.getFromDatabase("Animal Traps"), Trapping.getFromDatabase("Pole for Dead Rats")], [Trapping.getFromDatabase("Davrich Lantern"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Assistant"), Trapping.getFromDatabase("Large and Vicious Dog"), Trapping.getFromDatabase("Sack of Poisoned Bait (10 doses of Heartkill)")]], 0, "Burghers"),
            new Career("Townsman", "Townsmen meet these thriving centres of trade and commerce’s demand for workers. They fill various roles for private artisans or municipal councils: Bankers, Clerks, Hawkers, Innkeepers, Newspaper Vendors, Ostlers, Shopkeepers, Toll-keepers, Washers, and many more. Pay rates vary; some can haggle for extra commission, whereas civil employees such as lamplighters and toll-keepers are paid fixed salaries. There is little opportunity for promotion, but those with determination, savvy, and luck might eventually own property or a business. The most successful Townsmen often join local councils overseeing civic matters, with Burgomeisters — the most important municipal leaders — often enjoying the same social status as Merchant Princes and Guildmasters.", ["Clerk", "Townsman", "Town Councillor", "Burgomeister"], ["Silver 1", "Silver 2", "Silver 5", "Gold 1"], [["Fel", "Ag", "Int"], ["I"], ["Dex"], ["WP"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Melee(Brawling)"), Skill.getFromDatabase("Play (Any)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Research")], [Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Intimidate")]], [[Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Beneath Notice"), Talent.getFromDatabase("Etiquette (Servants)"), Talent.getFromDatabase("Sturdy")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Gregarious")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Supportive")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Master Orator"), Talent.getFromDatabase("Schemer"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Lodgings"), Trapping.getFromDatabase("Sturdy Boots")], [Trapping.getFromDatabase("Modest Townhouse"), Trapping.getFromDatabase("Servant"), Trapping.getFromDatabase("Quill and Ink")], [Trapping.getFromDatabase("Coach and Driver"), Trapping.getFromDatabase("Townhouse")], [Trapping.getFromDatabase("Chains of Office"), Trapping.getFromDatabase("Coach and Footman"), Trapping.getFromDatabase("Quality Clothing"), Trapping.getFromDatabase("Large Townhouse with Gardens and Servants")]], 0, "Burghers"),
            new Career("Watchman", "Watchmen are employed by local authorities to patrol streets throughout the Empire. Most are little more than well-meaning keepers of the peace, and few know the laws they’re supposed to enforce. Corruption is rampant, and many Watchmen enlist purely for the authority to hurt people or to support local criminal gangs. Some can earn triple their wages by turning a blind eye. Only a few towns and cities have professional Watchmen paid to understand and uphold the law; instead, the Emperor’s Peace is normally maintained by the local State Army, who man walls, guard gates, and patrol the streets according to the instructions of their superiors.", ["Watch Recruit", "Watchman", "Watch Sergeant", "Watch Captain"], ["Brass 3", "Silver 1", "Silver 3", "Gold 1"], [["WS", "S", "Fel"], ["WP"], ["I"], ["Int"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Local)")], [Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Law)")], [Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Ride (Horse)")]], [[Talent.getFromDatabase("Drilled"), Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Sprinter")], [Talent.getFromDatabase("Disarm"), Talent.getFromDatabase("Etiquette (Soldiers)"), Talent.getFromDatabase("Fearless (Criminals)"), Talent.getFromDatabase("Nose for Trouble")], [Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Robust"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Schemer")]], [[Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Uniform")], [Trapping.getFromDatabase("Lantern and Pole"), Trapping.getFromDatabase("Lamp Oil"), Trapping.getFromDatabase("Copper Badge")], [Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Helm"), Trapping.getFromDatabase("Symbol of Rank")], [Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Quality Hat"), Trapping.getFromDatabase("Quality Hand weapon"), Trapping.getFromDatabase("Quality Symbol of Rank")]], 0, "Burghers"),

            new Career("Advisor", "Advisors provide counsel to those they serve. Well-versed in the political and social conditions of their employer’s domain, they are privy to confidential and sensitive information. While many Advisors are born into their positions, others actively seek noble patronage as a path to wealth and power. Some young royals pick their university or childhood friends as their first Aide, trusting them to say what no-one else will. Long years at court or in service to a lesser noble pave the way to the loftier heights of their careers. Many Advisors do not serve the nobility at all, instead lending their extensive capabilities to criminals, warlords, merchants, cults, or guilds.", ["Aide", "Advisor", "Counsellor", "Chancellor"], ["Silver 2", "Silver 4", "Gold 1", "Gold 3"], [["T", "I", "Ag"], ["Fel"], ["Int"], ["WP"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Local)")], [Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Language(Any)"), Skill.getFromDatabase("Lore (Any)")], [Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Ride (Horse)")]], [[Talent.getFromDatabase("Beneath Notice"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Schemer"), Talent.getFromDatabase("Supportive")], [Talent.getFromDatabase("Argumentative"), Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Cat-tongued")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Writing Kit")], [Trapping.getFromDatabase("Livery")], [Trapping.getFromDatabase("Quality Clothing"), Trapping.getFromDatabase("Aide")], [Trapping.getFromDatabase("Riding Horse with Saddle and Harness"), Trapping.getFromDatabase("Quality")]], 0, "Courtiers"),
            new Career("Artist", "Artists use their talents — for painting, sculpting, writing and similar — to create works of fine art. Often their careers begin as Apprentices to experienced Master Artists, though some are simply prodigies. The best can attract a patron, and some end up teaching, forming their own schools of art and attracting the wealthiest of benefactors to their fashionable salons. Sadly, most Artists spend their lives in a vain attempt to prove their value to a society that rarely appreciates them. Some make ends meet through different means: satirising nobles and politicians in cartoons for the Altdorf broadsheets, sketching suspects for watch captains, writing social commentary, or even forging the work of more renowned artists.", ["Apprentice Artist", "Artist", "Master Artist", "Maestro"], ["Silver 1", "Silver 3", "Silver 5", "Gold 2"], [["S", "Dex", "I"], ["Fel"], ["WP"], ["Int"]], [[Skill.getFromDatabase("Art (Any)"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Urban)")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language(Classical)"), Skill.getFromDatabase("Sleight of Hand"), Skill.getFromDatabase("Trade (Art Supplies)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Art)"), Skill.getFromDatabase("Lore (Heraldry)")], [Skill.getFromDatabase("Research"), Skill.getFromDatabase("Ride (Horse)")]], [[Talent.getFromDatabase("Artistic"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Nimble Fingered")], [Talent.getFromDatabase("Acute Sense (Any)"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (any)"), Talent.getFromDatabase("Nose for Trouble")], [Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Magnum Opus"), Talent.getFromDatabase("Read/Write")]], [[Trapping.getFromDatabase("Brush or Chisel or Quill Pen")], [Trapping.getFromDatabase("Sling Bag containing Trade Tools (Artist)")], [Trapping.getFromDatabase("Apprentice"), Trapping.getFromDatabase("Patron"), Trapping.getFromDatabase("Workshop (Artist)")], [Trapping.getFromDatabase("Large Workshop (Artist)"), Trapping.getFromDatabase("Library (Art)"), Trapping.getFromDatabase("3 Apprentices")]], 0, "Courtiers"),
            new Career("Duellist", "Duellists fight on behalf of others — settling matters of honour between organisations or individuals — or as surrogates for the law, representing the accused or the accuser in trials by combat. For some Duellists the act of fighting is reward enough for the considerable risks they face. Training is dangerous, leaving some apprentices crippled or scarred for life. Those who live long enough to learn from their mistakes can aspire to the fame of a Blademaster, teaching their techniques to eager students. Judicial Champions duel on behalf of governments and nobles, and their blades can determine the fates of nations. Some modern Duellists, especially hot-headed Altdorf students, favour pistols. This is regarded by the older generation as dishonourable and foolhardy.", ["Fencer", "Duellist", "Duelmaster", "Judicial Champion"], ["Silver 3", "Silver 5", "Gold 1", "Gold 3"], [["WS", "Ag", "I"], ["BS"], ["S"], ["WP"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Melee (Parry)"), Skill.getFromDatabase("Ranged(Blackpowder)"), Skill.getFromDatabase("Trade (Gunsmith)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perform(Acrobatics)")], [Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Melee (Any)")]], [[Talent.getFromDatabase("Beat Blade"), Talent.getFromDatabase("Distract"), Talent.getFromDatabase("Feint"), Talent.getFromDatabase("Step Aside")], [Talent.getFromDatabase("Combat Reflexes"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Fast Shot"), Talent.getFromDatabase("Reversal")], [Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Disarm"), Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Riposte")], [Talent.getFromDatabase("Combat Master"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Reaction Strike"), Talent.getFromDatabase("Strike to Injure")]], [[Trapping.getFromDatabase("Basic Weapon or Rapier"), Trapping.getFromDatabase("Sling Bag containing Clothing and 1d10 Bandages")], [Trapping.getFromDatabase("Main Gauche or Sword-breaker"), Trapping.getFromDatabase("Pistol with Gunpowder and Ammunition")], [Trapping.getFromDatabase("Quality Rapier"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Trusty Second"), Trapping.getFromDatabase("2 Wooden Training Swords")], [Trapping.getFromDatabase("2 Quality Weapons")]], 0, "Courtiers"),
            new Career("Envoy", "Experts in negotiation and social interaction, Envoys act as agents serving the interests of the Empire, a regional estate, a foreign entity, or a merchant house. Intrigue abounds in courtly circles, and such a career choice is a risky proposition that only grows more perilous at the highest levels of government. Even when granted some manner of immunity against foreign laws or customs, Ambassadors must tread carefully. Envoys must first prove their abilities in a lesser capacity as a Herald, assisting Diplomats in hammering out the tedious minutiae of deals, or representing merchants, guilds, or cults, building their reputations with each pact they establish. Some Envoys find employ with Mercenary Companies; the best of these can secure a profit for their employers without shedding a drop of blood.", ["Herald", "Envoy", "Diplomat", "Ambassador"], ["Silver 2", "Silver 4", "Gold 2", "Gold 5"], [["T", "Ag", "Fel"], ["Int"], ["I"], ["WP"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Row")], [Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore(Politics)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Navigation")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Lore (Any)")]], [[Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Etiquette (Nobles)"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Etiquette (any)"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Schemer")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Noble Blood"), Talent.getFromDatabase("Savvy")]], [[Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Livery"), Trapping.getFromDatabase("Scroll Case")], [Trapping.getFromDatabase("Quill and Ink"), Trapping.getFromDatabase("10 sheets of parchment")], [Trapping.getFromDatabase("Aide"), Trapping.getFromDatabase("Quality Clothes"), Trapping.getFromDatabase("Map")], [Trapping.getFromDatabase("Aide"), Trapping.getFromDatabase("Best Quality Courtly Clothes"), Trapping.getFromDatabase("Staff of")]], 0, "Courtiers"),
            new Career("Noble", "The blood of highborn ancestors courses through the veins of the nobility, granting Nobles the power to rule, make laws, and dispense justice. Nobles often inherit vast wealth and holdings, although only those with a direct line of succession can expect to wield any genuine power. Many spend their lives consolidating this wealth and power through business, politics, and conquest. Those without substantial inheritance must make their own way in the world, joining the State Army or navy as a commissioned officer, or commit to service of one of the gods. It is common to find Nobles working for more powerful noble houses, such as sending their daughters to serve as hand maidens to royalty.", ["Scion", "Noble", "Magnate", "Noble Lord"], ["Gold 1", "Gold 3", "Gold 5", "Gold 7"], [["WS", "I", "Dex"], ["Fel"], ["Int"], ["WP"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Melee (Fencing)"), Skill.getFromDatabase("Play (Any)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Melee (Parry)")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Politics)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Lore (Any)"), Skill.getFromDatabase("Track")]], [[Talent.getFromDatabase("Etiquette (Nobles)"), Talent.getFromDatabase("Luck"), Talent.getFromDatabase("Noble Blood"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Schemer")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("War Leader"), Talent.getFromDatabase("Wealthy")]], [[Trapping.getFromDatabase("Courtly Garb"), Trapping.getFromDatabase("Foil or Hand Mirror"), Trapping.getFromDatabase("Jewellery worth 3d10 gc"), Trapping.getFromDatabase("Personal Servant")], [Trapping.getFromDatabase("4 Household Servants"), Trapping.getFromDatabase("Quality Courtly Garb"), Trapping.getFromDatabase("Courtly Garb"), Trapping.getFromDatabase("Riding Horse with Saddle and Harness or Coach"), Trapping.getFromDatabase("Main Gauche or Quality Cloak"), Trapping.getFromDatabase("Jewellery worth 50 gc")], [Trapping.getFromDatabase("2 sets of Quality Courtly Garb"), Trapping.getFromDatabase("200 gc"), Trapping.getFromDatabase("Fiefdom"), Trapping.getFromDatabase("Jewellery worth 200 gc"), Trapping.getFromDatabase("Signet Ring")], [Trapping.getFromDatabase("4 sets of Best Quality Courtly Garb"), Trapping.getFromDatabase("Quality Foil or Hand Mirror"), Trapping.getFromDatabase("500 gc"), Trapping.getFromDatabase("Jewellery worth 500 gc"), Trapping.getFromDatabase("Province")]], 0, "Courtiers"),
            new Career("Servant", "Most who serve the nobility come from peasant stock, grateful to escape the beleaguered masses tending the fields. Servants are taught comportment along with the skills necessary to cook, clean, buttle, and groom on behalf of their betters. They are provided with room, board, and a wage, but the quality of a Servant’s life depends on how well treated they are. Some Servants dress their employer, cook or serve meals, manage stores of wine and other consumables, or tend to the grounds. Experienced Servants can aspire to the role of personal Attendant, or even Steward, managing the domestic affairs of their employer and overseeing other Servants. Those directly serving royalty are often drawn from noble stock rather than the peasantry.", ["Menial", "Servant", "Attendant", "Steward"], ["Silver 1", "Silver 3", "Silver 5", "Gold 1"], [["T", "S", "Ag"], ["I"], ["Int"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Any)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (Local)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Melee (Basic)")]], [[Talent.getFromDatabase("Beneath Notice"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Sturdy")], [Talent.getFromDatabase("Etiquette (Servants)"), Talent.getFromDatabase("Shadow"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Well-Prepared")], [Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Resistance (Poison)"), Talent.getFromDatabase("Suave"), Talent.getFromDatabase("Supportive")], [Talent.getFromDatabase("Etiquette (any)"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Savvy")]], [[Trapping.getFromDatabase("Floor Brush")], [Trapping.getFromDatabase("Livery")], [Trapping.getFromDatabase("Quality Livery"), Trapping.getFromDatabase("Storm Lantern"), Trapping.getFromDatabase("Tinderbox"), Trapping.getFromDatabase("Lamp Oil")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Fine Clothes"), Trapping.getFromDatabase("Servant")]], 0, "Courtiers"),
            new Career("Spy", "Spies are brave (or foolhardy) individuals who secretly gather information for their clients. A well-placed Spy is an asset to anyone desiring knowledge of an opponent’s activities. Many take months, even years, cultivating an unremarkable identity with ties to one or more groups or individuals. Their actions are risky. If caught, Spies are rarely executed quickly and often tortured at length. Many Informers are forced into spying via blackmail or other threats. A skilled Spy will earn well, but extrication from such activities can be more perilous than the activities themselves. Given Spies avoid undue attention, they aren’t typically known by their reputations unless those reputations are as anonymous as they are.", ["Informer", "Spy", "Agent", "Spymaster"], ["Brass 3", "Silver 3", "Gold 1", "Gold 4"], [["Ag", "WP", "Fel"], ["WS"], ["I"], ["Int"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Any)")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Entertain (Act)"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Secret Signs (Any)"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Animal Training (Pigeon)"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Lore (Any)"), Skill.getFromDatabase("Research")]], [[Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Shadow")], [Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Lip Reading"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Secret Identity")], [Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Master of Disguise"), Talent.getFromDatabase("Mimic")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Schemer"), Talent.getFromDatabase("Suave"), Talent.getFromDatabase("Tower of Memories")]], [[Trapping.getFromDatabase("Charcoal stick"), Trapping.getFromDatabase("Sling Bag containing 2 different sets of clothing and Hooded Cloak")], [Trapping.getFromDatabase("Informer"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Disguise Kit"), Trapping.getFromDatabase("Ring of Informers"), Trapping.getFromDatabase("Telescope")], [Trapping.getFromDatabase("Book (Cryptography)"), Trapping.getFromDatabase("Ring of Spies and Informers"), Trapping.getFromDatabase("Loft of Homing Pigeons"), Trapping.getFromDatabase("Quill and Ink")], [Trapping.getFromDatabase("Office and Staff"), Trapping.getFromDatabase("Large Spy Ring of Agents"), Trapping.getFromDatabase("Spies"), Trapping.getFromDatabase("and Informers")]], 0, "Courtiers"),
            new Career("Warden", "Wardens see to the care and stewardship of their employer’s holdings. Failure to improve — or, at the very least, maintain — an employer’s lands or provisions is often met with disfavour. In some instances, multiple wardens work together to keep their employer’s estate in correct order. A Warden’s oversight can cover a variety of duties: ensuring the upkeep of a grand estate, overseeing a lord’s hunting grounds, or caring for a rarely-visited holidaying home. Wardens might keep watch over forested or agricultural lands, or see to the maintenance of lakes, rivers, or ponds. Those in the employ of the richest and most powerful can rise to immensely powerful positions themselves.", ["Custodian", "Warden", "Seneschal", "Governor"], ["Silver 1", "Silver 3", "Gold 1", "Gold 3"], [["T", "S", "WP"], ["WS"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Ranged (Bow)"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Language (Any)")]], [[Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Animal Affinity"), Talent.getFromDatabase("Etiquette (Servants)"), Talent.getFromDatabase("Strider (any)"), Talent.getFromDatabase("Rover")], [Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Supportive")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Etiquette (any)"), Talent.getFromDatabase("Savant (local)"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Keys"), Trapping.getFromDatabase("Lantern"), Trapping.getFromDatabase("Lamp Oil"), Trapping.getFromDatabase("Livery")], [Trapping.getFromDatabase("Hand Weapon or Bow with 10 arrows"), Trapping.getFromDatabase("Riding Horse with Saddle and Harness"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Ceremonial Staff of Office"), Trapping.getFromDatabase("Staff of Wardens and Custodians")], [Trapping.getFromDatabase("Aide"), Trapping.getFromDatabase("Governor’s Residence"), Trapping.getFromDatabase("Servant")]], 0, "Courtiers"),

            new Career("Bailiff", "Nobles entrust Bailiffs to gather dues from their lands. Some Bailiffs are respected and upstanding, attending throng at the temple of Sigmar every week. Others are bullies, happy to enforce their lord’s rights over property and possessions with threats and violence. Longserving bailiffs often become trusted servants of the local noble family and enjoy considerable perks. Reeves have a broader reach and greater responsibility. They keep order and maintain the borders of the lord’s lands, resolving disputes with neighbouring estates. Some magistrates are lay-members of the cult of Verena, seeking guidance and wisdom from blind Justice on any difficult cases they judge. However, most provincial magistrates simply find themselves arbitrating a series of petty disputes over livestock and farmland borders.", ["Tax Collector", "Bailiff", "Reeve", "Magistrate"], ["Silver 1", "Silver 5", "Gold 1", "Gold 3"], [["WS", "I", "WP"], ["Fel"], ["Ag"], ["WP"]], [[Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee(Basic)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Local)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ride(Horse)")], [Skill.getFromDatabase("Language (Classical)"), Skill.getFromDatabase("Lore (Law)")]], [[Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Savvy"), Talent.getFromDatabase("Schemer")]], [[Trapping.getFromDatabase("Hand weapon"), Trapping.getFromDatabase("small lock box")], [Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("3 Tax Collectors")], [Trapping.getFromDatabase("Horse with Saddle and Tack"), Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Bailiff")], [Trapping.getFromDatabase("Library (Law)"), Trapping.getFromDatabase("Quality Robes"), Trapping.getFromDatabase("Seal of Office")]], 0, "Peasants"),
            new Career("Hedge Witch", "Witch Hunters use the term ‘Hedge Witch’ for any illegal spellcaster, but this was not always so. Once Hedge Witches were respected members of rural communities, practising magics older than the forests. But decades of persecution since the founding of the Colleges of Magic have left the few surviving Hedge Witches disparate and broken. They hide in the quietest corners of the Old World, their smoky huts and creaking hovels standing astride the boundary between civilisation and the trackless wilds. Most Hedge Witches are solitary to protect themselves from prying strangers, but their talents are often known to locals. Their knowledge of warding evil is usually secret, but their herbalism, midwifery, and healing arts are quickly sought in times of need.", ["Hedge Apprentice", "Hedge Witch", "Hedge Master", "Hedgewise"], ["Brass 1", "Brass 2", "Brass 3", "Brass 5"], [["T", "I", "Dex"], ["Int"], ["Fel"], ["WP"]], [[Skill.getFromDatabase("Channelling"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Language (Magick)"), Skill.getFromDatabase("Lore (Folklore)"), Skill.getFromDatabase("Lore (Herbs)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Trade (Charms)"), Skill.getFromDatabase("Trade (Herbalist)")], [Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Genealogy)"), Skill.getFromDatabase("Lore (Magick"), Skill.getFromDatabase("Lore(Spirits)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Pray")]], [[Talent.getFromDatabase("Fast Hands"), Talent.getFromDatabase("Petty Magic"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strider (Woodlands)")], [Talent.getFromDatabase("Aethyric Attunement"), Talent.getFromDatabase("Animal Affinity"), Talent.getFromDatabase("Arcane Magic (Hedgecraft)"), Talent.getFromDatabase("Sixth Sense")], [Talent.getFromDatabase("Craftsman (Herbalist)"), Talent.getFromDatabase("Magical Sense"), Talent.getFromDatabase("Pure Soul"), Talent.getFromDatabase("Resistance (Disease)")], [Talent.getFromDatabase("Acute Sense (Any)"), Talent.getFromDatabase("Master Tradesman (Herbalist)"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("1d10 Lucky Charms"), Trapping.getFromDatabase("Quarterstaff"), Trapping.getFromDatabase("Backpack")], [Trapping.getFromDatabase("Antitoxin Kit"), Trapping.getFromDatabase("Healing Poultice"), Trapping.getFromDatabase("Trade Tools(Herbalist)")], [Trapping.getFromDatabase("Isolated Hut"), Trapping.getFromDatabase("Apprentice")], [Trapping.getFromDatabase("Assortment of Animal Skulls"), Trapping.getFromDatabase("Ceremonial Cloak and Garland")]], 0, "Peasants"),
            new Career("Herbalist", "Medicines from apothecaries are expensive and rarely available in the Reikland’s hinterlands, so peasants rely on the healing power of plants gathered, doctored, and administered by Herbalists. Most Herbalists’ lore is verbally passed down from master to apprentice, so names for illnesses and treatments often vary from village to village. The most experienced Herbwises are sent for in cases of mysterious or stubborn sicknesses. Herbalists dedicate time to visiting the sick, diagnosing their ailments and searching for herbs to treat them with. Some Herbalists ply a darker trade, sought out by those who can pay a high price for the illicit substances they offer. Although an untrue stereotype, it’s a standing joke in the trade that Halfling Herbalists are only interested in pipeweed and wyrdroot.", ["Herb Gatherer", "Herbalist", "Herb Master", "Herbwise"], ["Brass 2", "Brass 4", "Silver 1", "Silver 3"], [["T", "I", "Ag"], ["Dex"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Lore (Herbs)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Swim"), Skill.getFromDatabase("Trade (Herbalist)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore(Local)")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Medicine)"), Skill.getFromDatabase("Trade(Poisons)")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Acute Sense (Taste)"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strider (any)")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Nimble Fingered"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Sturdy")], [Talent.getFromDatabase("Craftsman (Herbalist)"), Talent.getFromDatabase("Field Dressing"), Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Savvy")], [Talent.getFromDatabase("Concoct"), Talent.getFromDatabase("Master Tradesman (Herbalist)"), Talent.getFromDatabase("Resistance (Poison)"), Talent.getFromDatabase("Savant (Herbs)")]], [[Trapping.getFromDatabase("Boots"), Trapping.getFromDatabase("Cloak"), Trapping.getFromDatabase("Sling Bag containing Assortment of Herbs")], [Trapping.getFromDatabase("Hand Weapon (Sickle)"), Trapping.getFromDatabase("Healing Poultice"), Trapping.getFromDatabase("Trade Tools (Herbalist)")], [Trapping.getFromDatabase("Herb Gatherer"), Trapping.getFromDatabase("3 Healing Poultices"), Trapping.getFromDatabase("Healing Draught"), Trapping.getFromDatabase("Workshop (Herbalist)")], [Trapping.getFromDatabase("Pony and Cart")]], 0, "Peasants"),
            new Career("Hunter", "‘Taal’s Bounty’ is a common greeting in Hochland, where locals proclaim a proud hunting heritage that goes back to the time of Sigmar. Most in the Empire hunt, either as a hobby, a profession, or a necessity, and many Hunters turn to poaching when times are lean. Particularly skilled Hunters might be engaged as a noble’s Huntsmaster, granting access to fine weapons, horses, and falcons. Elves and Dwarfs have little care for the boundaries of men and will occasionally venture deep into Human territory tracking a challenging prize. Stories of the Wood Elves’ Wild Hunt petrify children of the Grey Mountains, and not without cause, for if any intruder strays too close to Elven lands, then the hunters quickly become the hunted.", ["Trapper", "Hunter", "Tracker", "Huntsmaster"], ["Brass 2", "Brass 4", "Silver 1", "Silver 3"], [["T", "Dex", "S"], ["BS"], ["I"], ["Int"]], [[Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Lore (Beasts)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Bow)"), Skill.getFromDatabase("Set Trap")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Ranged (Sling)"), Skill.getFromDatabase("Secret Signs (Hunter)"), Skill.getFromDatabase("Stealth (Rural)")], [Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Swim"), Skill.getFromDatabase("Track")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Animal Training (Any)")]], [[Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strider (any)"), Talent.getFromDatabase("Trapper")], [Talent.getFromDatabase("Accurate Shot"), Talent.getFromDatabase("Fast Shot"), Talent.getFromDatabase("Hunter’s Eye"), Talent.getFromDatabase("Marksman")], [Talent.getFromDatabase("Acute Sense (any)"), Talent.getFromDatabase("Deadeye Shot"), Talent.getFromDatabase("Fearless (Animals)"), Talent.getFromDatabase("Sharpshooter")], [Talent.getFromDatabase("Fearless (Monsters)"), Talent.getFromDatabase("Robust"), Talent.getFromDatabase("Sniper"), Talent.getFromDatabase("Sure Shot")]], [[Trapping.getFromDatabase("Selection of Animal Traps"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Sturdy Boots and Cloak")], [Trapping.getFromDatabase("Bow with 10 arrows"), Trapping.getFromDatabase("Sling with Ammunition")], [Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Bedroll"), Trapping.getFromDatabase("Tent")], [Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Kennel of Hunting Dogs")]], 0, "Peasants"),
            new Career("Miner", "Many prospectors are tempted by stories of gold in the Skaag Hills, but real mining is hard work down dark, dangerous tunnels. Adept at constructing supports and assessing mineral ores for their value, Miners are alert to unexpected dangers from explosive gas to tunnelling Greenskins, and are notoriously tough, both physically and mentally. Prospectors usually work on commission, with a license to prospect in return for sharing finds with the local lord. Some noble houses’ fortunes are built on the rich mines in their lands, and often Miners in these pits will be criminals or debtors pressed into service. Quarrymen hewing open-face stone ostensibly have a safer job than those underground, but accidents are common and Beastman attack from the forest is an ever-present danger.", ["Prospector", "Miner", "Master Miner", "Mine Foreman"], ["Brass 2", "Brass 4", "Brass 5", "Silver 4"], [["T", "S", "WP"], ["WS"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Melee(Two-Handed)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Secret Signs (Miner)"), Skill.getFromDatabase("Trade (Explosives)")], [Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore (Geology)"), Skill.getFromDatabase("Stealth (Underground)"), Skill.getFromDatabase("Trade (Engineer)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strider (Rocky)"), Talent.getFromDatabase("Sturdy"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Strike Mighty Blow"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Careful Strike"), Talent.getFromDatabase("Craftsman (Explosives)"), Talent.getFromDatabase("Tinker"), Talent.getFromDatabase("Tunnel Rat")], [Talent.getFromDatabase("Argumentative"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Read/Write")]], [[Trapping.getFromDatabase("Charcoal Stick"), Trapping.getFromDatabase("Crude Map"), Trapping.getFromDatabase("Pan"), Trapping.getFromDatabase("Spade")], [Trapping.getFromDatabase("Davrich Lamp"), Trapping.getFromDatabase("Hand Weapon (Pick)"), Trapping.getFromDatabase("Lamp Oil"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Great Weapon (Two-Handed Pick)"), Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Trade Tools (Engineer)")], [Trapping.getFromDatabase("Crew of Miners"), Trapping.getFromDatabase("Writing Kit")]], 0, "Peasants"),
            new Career("Mystic", "Searching for meaning in a dangerous world, people turn to Mystics for a glimpse of their future. Wandering caravans of Strigany are a common sight in Reikland, and locals scrape together coin to hear their fortune, and buy charms and love potions. Most Mystics are perceptive and intuitive, able to divine their customers’ hopes and fears and give readings just specific enough to be believable. Mystics must be careful, and walk a fine line between accusations of trickery and heretical witchery. Mystics demonstrate their talent in a wide variety of ways: palmists and card readers are common amongst the Strigany, while a Wood Elf is more likely to interpret the signs and symbols to be found around them in nature, or to be inspired by dreams and visions. Many cults also have their own Seers and Sages, each prophesising the future through the paradigm of their beliefs.", ["Fortune Teller", "Mystic", "Sage", "Seer"], ["Brass 1", "Brass 2", "Brass 3", "Brass 4"], [["I", "Dex", "Fel"], ["WP"], ["Ag"], ["Int"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Entertain (Fortune Telling)"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Entertain (Prophecy)"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (Astrology)")], [Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Art (Writing)")], [Skill.getFromDatabase("Lore (Prophecy)"), Skill.getFromDatabase("Channelling (Azyr)")]], [[Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Luck"), Talent.getFromDatabase("Second Sight"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Detect Artefact"), Talent.getFromDatabase("Holy Visions"), Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Well-prepared")], [Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Petty Magic"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Witch!")], [Talent.getFromDatabase("Arcane Magic (Heavens)"), Talent.getFromDatabase("Magical Sense"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("Deck of Cards or Dice"), Trapping.getFromDatabase("Cheap Jewellery")], [Trapping.getFromDatabase("Selection of Amulets")], [Trapping.getFromDatabase("Trade Tools (Writing)")], [Trapping.getFromDatabase("Trade Tools (Astrology)")]], 0, "Peasants"),
            new Career("Scout", "Among an illiterate populace where maps are rare, local knowledge can mean the difference between life and death for travellers. Scouts are experts at finding safe paths through the backwoods and muddy roads of the Empire. Local guides will accompany their clients, warning of upcoming dangers, sharing village gossip or showing the best places to forage. Experienced Scouts will barely be seen by their employers as they explore the trails ahead and keep a watchful eye out for hidden dangers. While most Scouts keep to familiar territory, some specialise in safely navigating unmapped terrain. Explorers might venture even further into treacherous and hostile territory, filling in the blank spaces on their maps. Most Scouts do not tackle dangers themselves, preferring to slip away quietly to warn their companions and enable their employers to avoid potential hazards completely.", ["Guide", "Scout", "Pathfinder", "Explorer"], ["Brass 3", "Brass 5", "Silver 1", "Silver 5"], [["T", "I", "Ag"], ["BS"], ["Int"], ["Dex"]], [[Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore(Local)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ranged (Bow)"), Skill.getFromDatabase("Ride(Horse)"), Skill.getFromDatabase("Stealth (Rural)"), Skill.getFromDatabase("Track")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Secret Signs (Hunter)"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Language (any)"), Skill.getFromDatabase("Trade (Cartographer)")]], [[Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Strider (any)")], [Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Acute Sense (Sight)"), Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Strong Legs"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Linguistics"), Talent.getFromDatabase("Savant (Local)"), Talent.getFromDatabase("Tenacious")]], [[Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Sturdy Boots and Cloak"), Trapping.getFromDatabase("Rope")], [Trapping.getFromDatabase("Bow and 10 Arrows"), Trapping.getFromDatabase("Mail Shirt")], [Trapping.getFromDatabase("Map"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Saddlebags with 2 weeks’ Rations"), Trapping.getFromDatabase("Tent")], [Trapping.getFromDatabase("Selection of Maps"), Trapping.getFromDatabase("Trade Tools (Cartographer)")]], 0, "Peasants"),
            new Career("Villager", "Sigmar’s bountiful Empire provides an abundant harvest of crops, livestock, and other marketable goods, so there is always plenty of work to be found in the countryside. Villagers make up most of the Empire’s population and perform a variety of valuable roles, including Farmers, Charcoal Burners, Woodsmen, Millers, Herders, and many more. Most villages fall under the domain of a noble family, where day-to-day administration of the estate is overseen by a bailiff. Village affairs are usually managed by a village council of local tradesmen and farmers led by an Elder. A village Councillor or Elder can hold significant local influence overseeing many decisions concerning the surrounding land.", ["Peasant", "Villager", "Councillor", "Village Elder"], ["Brass 2", "Brass 3", "Brass 4", "Silver 2"], [["T", "S", "Ag"], ["WS"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Trade (Any)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (History)")]], [[Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Stone Soup")], [Talent.getFromDatabase("Animal Affinity"), Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Craftsman (Any)"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Stout-hearted"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Master Tradesman (Any)"), Talent.getFromDatabase("Nimble Fingered"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Savant (Local)")]], [[Trapping.getFromDatabase("None")], [Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Hand Weapon(Axe)"), Trapping.getFromDatabase("Trade Tools (as Trade)")], [Trapping.getFromDatabase("Mule and Cart"), Trapping.getFromDatabase("Village Home and Workshop")], [Trapping.getFromDatabase("The Respect of the Village")]], 0, "Peasants"),

            new Career("Bounty Hunter", "Bounty Hunters track down fugitives and outlaws for coin. Most are legally appointed by provincial courts and receive warrant papers granting licence to seize or sometimes kill the target. While some are motivated by Verena’s justice, most are more concerned by the rewards, often finding the ‘dead’ in ‘dead or alive’ to be the most convenient route to their fortune. Many Bounty Hunters start as Thief-Takers, those hired by crime victims to retrieve stolen goods. Over time, those with an established reputation may find permanent work from a merchant or noble house, guild, or cult, or may build a company of Bounty Hunters, working as a group to collect the largest rewards.", ["Thief-taker", "Bounty Hunter", "Master Bounty Hunter", "Bounty Hunter General"], ["Silver 1", "Silver 3", "Silver 5", "Gold 1"], [["T", "WS", "Ag"], ["BS"], ["S"], ["Int"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee(Basic)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Ranged(Crossbow)"), Skill.getFromDatabase("Ranged (Entangling)"), Skill.getFromDatabase("Track")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Lore (Law)")]], [[Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Shadow"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Relentless"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Strong Back")], [Talent.getFromDatabase("Accurate Shot"), Talent.getFromDatabase("Careful Strike"), Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Sprinter")], [Talent.getFromDatabase("Deadeye Shot"), Talent.getFromDatabase("Fearless (Bounties)"), Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Sure Shot")]], [[Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Rope")], [Trapping.getFromDatabase("Crossbow and 10 bolts"), Trapping.getFromDatabase("Leather Skullcap"), Trapping.getFromDatabase("Manacles"), Trapping.getFromDatabase("Net"), Trapping.getFromDatabase("Warrant Papers")], [Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Riding Horse and Saddle")], [Trapping.getFromDatabase("Draught Horse and Cart"), Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("4 Pairs of Manacles")]], 0, "Rangers"),
            new Career("Coachman", "For many, the coach is the only way to get from one town to the next. The wild places between teem with Beastmen, Bandits, and worse, but with just a team of fresh horses and a blunderbuss, brave and hardworking Coachmen make travel possible. To help evade danger, most coaching companies relentlessly pursue speed, and their employees have a reputation for ruthlessness towards other travellers on the roads, never trusting anyone. Coachmen often start as Postilions, riding the lead horse of the team through wind and rain. Instead of transporting passengers, some Coachmen deliver mail, work as chauffeurs for nobles, drive cabs or goods wagons, or the big omnibuses of the great cities, or even become a getaway driver.", ["Postilion", "Coachman", "Coach Master", "Route Master"], ["Silver 1", "Silver 2", "Silver 3", "Silver 5"], [["T", "BS", "WP"], ["Ag"], ["WS"], ["I"]], [[Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Entangling)"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ranged (Blackpowder)")], [Skill.getFromDatabase("Animal Training (Horse)"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language(any)"), Skill.getFromDatabase("Lore (Routes)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Animal Affinity"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Trick Riding"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Crack the Whip"), Talent.getFromDatabase("Gunner"), Talent.getFromDatabase("Strong-minded")], [Talent.getFromDatabase("Accurate Shot"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Fearless (Outlaws)"), Talent.getFromDatabase("Nose for Trouble")], [Talent.getFromDatabase("Fearless (Beastmen)"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Rapid Reload")]], [[Trapping.getFromDatabase("Warm Coat and Gloves"), Trapping.getFromDatabase("Whip")], [Trapping.getFromDatabase("Blunderbuss with 10 Shots"), Trapping.getFromDatabase("Coach Horn"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Hat")], [Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Pistol"), Trapping.getFromDatabase("Quality Cloak")], [Trapping.getFromDatabase("Fleet of Coaches and Horses"), Trapping.getFromDatabase("Maps")]], 0, "Rangers"),
            new Career("Entertainer", "Entertainers crop up all over the Old World, and many wander the Reikland’s roads, earning their crust. Some stay put at a single theatre, some work as individuals, some as part of a troupe. The worst are little more than itinerant beggars, the best lauded in the company of counts and princes. It is not an easy life and the people will not tolerate poor acts, running them out of town pelted with rotten vegetables. The most common Entertainers are the perennial crowd-pleasers like jesters, singers, actors, musicians, acrobats, dancers, and jugglers, but the Old World is also home to more obscure and bizarre acts.", ["Busker", "Entertainer", "Troubadour", "Troupe Leader"], ["Brass 3", "Brass 5", "Silver 3", "Gold 1"], [["Ag", "Dex", "Fel"], ["WS"], ["BS"], ["T"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Entertain (Any)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Perform (Any)"), Skill.getFromDatabase("Play (any)"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Entertain (Any)"), Skill.getFromDatabase("Ride (Any)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perform(Any)"), Skill.getFromDatabase("Play (Any) Ranged (Throwing)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Animal Training (Any)"), Skill.getFromDatabase("Art (Writing)"), Skill.getFromDatabase("Language (Any)")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Mimic"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Contortionist"), Talent.getFromDatabase("Jump Up"), Talent.getFromDatabase("Sharpshooter"), Talent.getFromDatabase("Trick Riding")], [Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Master of Disguise"), Talent.getFromDatabase("Perfect Pitch"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Sharp")]], [[Trapping.getFromDatabase("Bowl"), Trapping.getFromDatabase("Instrument")], [Trapping.getFromDatabase("Costume"), Trapping.getFromDatabase("Instrument"), Trapping.getFromDatabase("Selection of Scripts (that you can’t yet read)"), Trapping.getFromDatabase("Throwing Weapons")], [Trapping.getFromDatabase("Trained Animal"), Trapping.getFromDatabase("Writing Kit")], [Trapping.getFromDatabase("Draught Horses and Wagon (Stage)"), Trapping.getFromDatabase("Wardrobe of Costumes and Props"), Trapping.getFromDatabase("Troupe of Entertainers")]], 0, "Rangers"),
            new Career("Flagellant", "Forgiveness does not come easily, only through struggle, pain, and doing Sigmar’s will. Flagellants travel the Empire, flogging themselves in penance for their sins, and the sins of others. They are determined to serve Sigmar until the end of the world, something they believe is imminent. All good folk are expected to welcome, help, and feed them, and to pray with them. Most Flagellants wander in large groups, guided by a Prophet of Doom who interprets Sigmar’s will. Some follow armies, whipping themselves into a frenzy as battle is joined and fighting without any thought for their own safety. Others wander by themselves, believing they best serve Sigmar by righting the wrongs he guides them towards.", ["Zealot", "Flagellant", "Penitent", "Prophet of Doom"], ["Brass 0", "Brass 0", "Brass 0", "Brass 0"], [["T", "WS", "S"], ["WP"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Sigmar)"), Skill.getFromDatabase("Melee (Flail)"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Art (Icons)"), Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Language(Classical)"), Skill.getFromDatabase("Lore (The Empire)"), Skill.getFromDatabase("Ranged (Sling)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Language (any)"), Skill.getFromDatabase("Lore (Theology)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Entertain (Speeches)"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Berserk Charge"), Talent.getFromDatabase("Frenzy"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Stone Soup")], [Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Hatred (Heretics)"), Talent.getFromDatabase("Flagellant"), Talent.getFromDatabase("Implacable")], [Talent.getFromDatabase("Field Dressing"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Battle Rage"), Talent.getFromDatabase("Fearless (Heretics)"), Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Impassioned Zeal")]], [[Trapping.getFromDatabase("Flail"), Trapping.getFromDatabase("Tattered Robes")], [Trapping.getFromDatabase("Placard"), Trapping.getFromDatabase("Religious Symbol"), Trapping.getFromDatabase("Sling")], [Trapping.getFromDatabase("Religious Relic")], [Trapping.getFromDatabase("Book (Religion)"), Trapping.getFromDatabase("Followers (including Penitents"), Trapping.getFromDatabase("Flagellants"), Trapping.getFromDatabase("and Zealots)")]], 0, "Rangers"),
            new Career("Messenger", "When the postal service is unsecure or too slow, people send a Messenger. Several courier companies provide express services, competing to show they are the fastest and safest. Most Messengers take their duties very seriously, guarding their packages with their lives. Some courier companies have arrangements with coaching houses allowing their Messengers to swap tired horses for fresh ones, for topspeed delivery. Runners are employed to carry urgent messages in cities. Many larger settlements host competitions to celebrate the fastest, with the winners taking prizes and lucrative job contracts. Messengers can also be found working for the military, noble houses, large merchant houses, and for criminal gangs seeking to maintain their privacy.", ["Runner", "Messenger", "Courier", "Courier-Captain"], ["Brass 3", "Silver 1", "Silver 3", "Silver 5"], [["T", "Ag", "I"], ["WS"], ["WP"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Melee (Brawling)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Fleet Footed"), Talent.getFromDatabase("Sprinter"), Talent.getFromDatabase("Step Aside")], [Talent.getFromDatabase("Crack the Whip"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Relentless"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Trick Riding")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Hatred (Outlaws)"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Very Resilient")]], [[Trapping.getFromDatabase("Scroll Case")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack")], [Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Saddlebags"), Trapping.getFromDatabase("Shield")], [Trapping.getFromDatabase("Couriers"), Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Writing Kit")]], 0, "Rangers"),
            new Career("Pedlar", "Pedlars traipse from village to hamlet, selling goods and services such as knife sharpening, mending, and tinkering. Most carry cheap stock readily available in larger towns, including small luxuries such as ribbons and hair pins. Pedlars are always welcome as even suspicious folk like to treat themselves to baubles and knickknacks. Some Pedlars also take on messenger work; others act as de facto town criers, bringing news and gossip to the quietest corners of the Empire in exchange for bed-and-board. Given the dangers on the road, some Pedlars prefer to keep a stall at a regular town marketplace. It is also common to find them on pilgrim routes making a living selling relics to the devout.", ["Vagabond", "Pedlar", "Master Pedlar", "Wandering Trader"], ["Brass 1", "Brass 4", "Silver 1", "Silver 3"], [["T", "Dex", "WP"], ["Fel"], ["I"], ["Int"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Stealth (Rural or Urban)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Trade (Tinker)")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (any)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Lore (Geography)")]], [[Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Tinker")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Strong Back")], [Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Sturdy"), Talent.getFromDatabase("Well-prepared"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Suave"), Talent.getFromDatabase("Tenacious")]], [[Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Bedroll"), Trapping.getFromDatabase("Goods worth 2d10 Brass"), Trapping.getFromDatabase("Tent")], [Trapping.getFromDatabase("Mule and Saddlebags"), Trapping.getFromDatabase("Goods worth 2d10 Silver"), Trapping.getFromDatabase("Selection of Pots and Pans"), Trapping.getFromDatabase("Trade Tools (Tinker)")], [Trapping.getFromDatabase("Cart"), Trapping.getFromDatabase("Goods worth at least 2d10 Gold")], [Trapping.getFromDatabase("Draught Horse and Wagon"), Trapping.getFromDatabase("Goods worth at least 5d10 Gold"), Trapping.getFromDatabase("50 Silver in Coin")]], 0, "Rangers"),
            new Career("Road Warden", "Road Wardens protect travellers from the bandits, Greenskins, Beastmen and other dangers that threaten the Empire’s highways. The Wardens are supported by a system of tolls, taxes they often collect personally. Successful Road Wardens are well-received and respected, and often have bunks in each inn along their route. Most mainroad Road Wardens are part of the State Army, patrolling primary thoroughfares during peace time, so are well-trained and resplendent in neat uniforms. Less-travelled roads make do with local equivalents, some of whom take advantage of their position and lack of supervision for their own gain. Some Wardens prefer sitting in their safe, fortified toll stations to clearing the roads, but travellers often balk at handing over coin when the roads are dangerous and in disrepair.", ["Toll Keeper", "Road Warden", "Road Sergeant", "Road Captain"], ["Brass 5", "Silver 2", "Silver 4", "Gold 1"], [["T", "BS", "I"], ["WS"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Crossbow)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Ranged (Blackpowder)")], [Skill.getFromDatabase("Lore (Empire)"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Numismatics")], [Talent.getFromDatabase("Crack the Whip"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Roughrider"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Etiquette (Soldiers)"), Talent.getFromDatabase("Fearless (Outlaws)"), Talent.getFromDatabase("Hatred (any)"), Talent.getFromDatabase("Nose for Trouble")], [Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Public Speaker")]], [[Trapping.getFromDatabase("Crossbow with 10 Bolts"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Riding Horse with Saddle and Harness"), Trapping.getFromDatabase("Rope")], [Trapping.getFromDatabase("Squad of Road Wardens"), Trapping.getFromDatabase("Pistol with 10 Shots"), Trapping.getFromDatabase("Shield"), Trapping.getFromDatabase("Symbol of Rank")], [Trapping.getFromDatabase("Light Warhorse"), Trapping.getFromDatabase("Pistol with 10 Shots"), Trapping.getFromDatabase("Quality Hat and Cloak"), Trapping.getFromDatabase("Unit of Road Wardens")]], 0, "Rangers"),
            new Career("Witch Hunter", "There are few so feared and respected as the Witch Hunter, and they are given extraordinary leeway in performing their duties. Typically armed with silvered blades and a brace of pistols — for lead is not so easily dispelled — they stalk all corners of the Old World ready to dispense judgement on any witch they find, or any who would harbour them. Most Witch Hunters in the Empire are attached to the Cult of Sigmar. Secular Witch Hunters are sometimes employed by provincial government, though these are little more than specialist bounty hunters. The Colleges of Magic also have Witch Hunters called Magisters Vigilant who pursue rogue wizards, necromancers, and daemonologists — they believe it is wisest to set a witch to catch a witch.", ["Interrogator", "Witch Hunter", "Inquisitor", "Witchfinder General"], ["Silver 1", "Silver 3", "Silver 5", "Gold 1"], [["T", "WS", "WP"], ["BS"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Torture)"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore (Witches)"), Skill.getFromDatabase("Ranged (Any)"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Lore (Local)")], [Skill.getFromDatabase("Lore (Chaos)"), Skill.getFromDatabase("Lore (Politics)")]], [[Talent.getFromDatabase("Coolheaded"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Resolute")], [Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Shadow")], [Talent.getFromDatabase("Fearless (Witches)"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Relentless"), Talent.getFromDatabase("Strong-minded")], [Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Magical Sense"), Talent.getFromDatabase("Pure Soul")]], [[Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Instruments of Torture")], [Trapping.getFromDatabase("Crossbow Pistol or Pistol"), Trapping.getFromDatabase("Hat (Henin)"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Rope"), Trapping.getFromDatabase("Silvered Sword")], [Trapping.getFromDatabase("Quality Clothing"), Trapping.getFromDatabase("Subordinate Interrogators")], [Trapping.getFromDatabase("Best Quality Courtly Garb"), Trapping.getFromDatabase("Subordinate Witch Hunters")]], 0, "Rangers"),

            new Career("Boatman", "Boats and barges travel the Empire’s waterways, bringing goods from the remotest corners of the provinces to the greatest cities. These shallow-drafted vessels can travel much further upriver than larger ships, and a comprehensive network of canals adds to their reach. Barge Masters are expert river sailors and have an exhaustive knowledge of their rivers. A Boat-hand is the dogsbody, but will learn the ropes swiftly. Boatmen crew merchant barges carrying cargo to and from markets, either working for themselves or for a larger Merchant House. Many Boatmen are also ferrymen, taking passengers across rivers, or to and from towns. In large towns, some also crew rivertaxis, sail pleasure vessels, or otherwise pilot boats on the behalf of others.", ["Boat-hand", "Boatman", "Bargeswain", "Barge Master"], ["Silver 1", "Silver 2", "Silver 3", "Silver 5"], [["T", "S", "Ag"], ["I"], ["Dex"], ["Int"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Melee(Basic)"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Sail"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Riverways)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Entertain (Singing)"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Trade (Boatbuilding)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Strong Swimmer")], [Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Very Strong"), Talent.getFromDatabase("Waterman")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Strike Mighty Blow")], [Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Public Speaker")]], [[Trapping.getFromDatabase("Hand Weapon (Boat Hook)"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Pole")], [Trapping.getFromDatabase("Rope"), Trapping.getFromDatabase("Rowboat")], [Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Trade Tools(Carpenter)")], [Trapping.getFromDatabase("Hat"), Trapping.getFromDatabase("Riverboat and Crew")]], 0, "Riverfolk"),
            new Career("Huffer", "Huffers are specialist river guides with expert knowledge of local river systems. They are a common sight near the most dangerous stretches of the Empire’s rivers and can command significant wages for what many view as easy work. Others view it as cheap compared to the potential cost of lost cargo. Many Huffers specialise in a single, notorious stretch of water, while others make their money at certain times of the year when the waters are at their worst. Other Huffers have broader knowledge and will guide vessels for their entire journey, effectively acting as navigators. This is especially true of merchant ships with particularly valuable cargo at difficult times of the year.", ["Riverguide", "Huffer", "Pilot", "Master Pilot"], ["Brass 4", "Silver 1", "Silver 3", "Silver 5"], [["T", "I", "WS"], ["WP"], ["Int"], ["Fel"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Local)"), Skill.getFromDatabase("Lore (Riverways)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Navigation")], [Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Lore(Wrecks)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Sail")]], [[Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Waterman")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (Guilder)"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("River Guide")], [Talent.getFromDatabase("Acute Sense (Sight)"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Sea Legs"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Strong Swimmer"), Talent.getFromDatabase("Tenacious")]], [[Trapping.getFromDatabase("Hand Weapon (Boat Hook)"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Rope"), Trapping.getFromDatabase("Row Boat")], [Trapping.getFromDatabase("Pole"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("Boathand"), Trapping.getFromDatabase("Small Riverboat")]], 0, "Riverfolk"),
            new Career("Riverwarden", "A clarion call across the waterways heralds the arrival of the Imperial River Patrol, a river-borne police force known as much for its harassing thugs as for its good work. Most riverside villages and inns set aside moorings for them as, without them, worse criminals would rule the waters. The overworked patrols concentrate on egregious crimes, resolving petty misdemeanours with spot fines. On major trade-routes, the patrols have larger vessels manned by ‘Shipswords’ trained to tackle larger threats like Greenskins or Trolls. Some Riverwardens rarely see the water, instead manning remote outposts overlooking strategically important waters. Others crew fast riverboats charged to intercept smugglers in the night. The largest Riverwarden vessels are effectively sea-worthy warships, bristling with cannon and mortars, ready for almost any eventuality.", ["River Recruit", "Riverwarden", "Shipsword", "Shipsword Master"], ["Silver 1", "Silver 2", "Silver 4", "Gold 1"], [["BS", "S", "Fel"], ["WS"], ["I"], ["Int"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Sail"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore(Riverways)"), Skill.getFromDatabase("Ranged (Blackpowder)")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Strong Swimmer"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Very Strong"), Talent.getFromDatabase("Waterman")], [Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Gunner"), Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Fearless (Wreckers)"), Talent.getFromDatabase("Hatred (Any)"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Sea Legs")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Orientation")]], [[Trapping.getFromDatabase("Hand Weapon (Sword)"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Uniform")], [Trapping.getFromDatabase("Lantern and Oil"), Trapping.getFromDatabase("Pistol with 10 shot"), Trapping.getFromDatabase("Shield")], [Trapping.getFromDatabase("Grappling Hook"), Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Mail Shirt")], [Trapping.getFromDatabase("Patrol Boats and Crew"), Trapping.getFromDatabase("Symbol of Rank")]], 0, "Riverfolk"),
            new Career("Riverwoman", "The fertile banks of the great rivers of the Empire are densely populated, and the folk working day-in, day-out in the nearby waters and marshes provide much of the fresh fish, eels, and crustaceans feeding the towns and cities. Unlike the inland villages, those on the great rivers frequently receive outsiders who trade and restock, meaning Riverwomen are somewhat more open and diverse, and often the first with news from distant lands. There are any number of diverse jobs supported by the river. Many harvest the Reik’s bounty: fisherfolk (using rod, spear, or net), eelers (using traps or pots), or diggers for shellfish. Many live in riverside villages labouring, dredging, or lugging, and maintaining the Reik’s many thousands of vessels.", ["Greenfish", "Riverwoman", "Riverwise", "River Elder"], ["Brass 2", "Brass 3", "Brass 5", "Silver 2"], [["T", "Dex", "Ag"], ["WS"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Lore (Riverways)"), Skill.getFromDatabase("Ranged(Entangling)"), Skill.getFromDatabase("Ranged (Throwing)"), Skill.getFromDatabase("Set Trap")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Pole-Arm)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Lore(Folklore)")]], [[Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Strider (Marshes)"), Talent.getFromDatabase("Strong Swimmer")], [Talent.getFromDatabase("Craftsman (Boatbuilder)"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Waterman")], [Talent.getFromDatabase("Savant (Riverways)"), Talent.getFromDatabase("Stout-hearted"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Master Tradesman (Boatbuilder)"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Sharp"), Talent.getFromDatabase("Strong-minded")]], [[Trapping.getFromDatabase("Bucket"), Trapping.getFromDatabase("Fishing Rod and Bait"), Trapping.getFromDatabase("Leather Leggings")], [Trapping.getFromDatabase("Eel Trap"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Net"), Trapping.getFromDatabase("Spear")], [Trapping.getFromDatabase("Row Boat"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("Hut or Riverboat")]], 0, "Riverfolk"),
            new Career("Seaman", "Seamen sail the high seas in the Imperial Navy or for one of the Merchant houses. The Reikland may have no coast, but the River Reik from the Wasteland to Altdorf is miles wide and full of ocean-going vessels. The Imperial First Fleet that patrols these waters rarely sees the open sea, because the taxes to pass warships through Marienburg are exorbitantly high. Seamen can always find work, whether as cabin staff on an Imperial battleship or on the crew of a small trading sloop. Some Seamen travel the world by working to pay their passage. The Reik also houses many ‘Missions’, buildings provided by the Imperial Navy for their staff, many of which employ Seamen.", ["Landsman", "Seaman", "Boatswain", "Ship’s Master"], ["Silver 1", "Silver 3", "Silver 5", "Gold 2"], [["Ag", "Dex", "Fel"], ["WS"], ["I"], ["Int"]], [[Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Sail"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain(Singing)"), Skill.getFromDatabase("Language (any)"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Trade (Carpenter)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Strider (Coastal)"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Strong Swimmer")], [Talent.getFromDatabase("Catfall"), Talent.getFromDatabase("Sea Legs"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Strong Legs")], [Talent.getFromDatabase("Old Salt"), Talent.getFromDatabase("Strike Mighty Blow"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Orientation"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Savvy")]], [[Trapping.getFromDatabase("Bucket"), Trapping.getFromDatabase("Brush"), Trapping.getFromDatabase("Mop")], [Trapping.getFromDatabase("Hand Weapon (Boat Hook)"), Trapping.getFromDatabase("Leather Jerkin")], [Trapping.getFromDatabase("Trade Tools (Carpenter)")], [Trapping.getFromDatabase("Shipping Charts"), Trapping.getFromDatabase("Sailing Ship and Crew"), Trapping.getFromDatabase("Sextant"), Trapping.getFromDatabase("Spyglass")]], 0, "Riverfolk"),
            new Career("Smuggler", "Most trade is legally taxed by local lords, as well as illegally taxed by bandits and protection rackets. Smugglers see themselves as charitable helpers: merchants make more profit, customers pay less coin, morally flexible Riverwardens take a cut, outlaws are avoided, and more besides. It takes experience and ingenuity to circumvent all the bailiffs, custom officials, excisemen, and busy bodies keen to stop them, but Smugglers dare the risks to support themselves and their families. Smugglers come in many forms, perhaps transporting tiny, highvalue goods for nobles, or large cargoes for shady merchants. Some Smugglers also deal in illicit goods, a crime that will incur significantly more repercussions than a burned finger or smugglers’ brand.", ["River Runner", "Smuggler", "Master Smuggler", "Smuggler King"], ["Brass 2", "Brass 3", "Brass 5", "Silver 2"], [["Ag", "Dex", "WP"], ["I"], ["Int"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Sail"), Skill.getFromDatabase("Stealth (Rural or Urban)"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Secret Signs (Smuggler)")], [Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Riverways)")], [Skill.getFromDatabase("Language (Any)"), Skill.getFromDatabase("Leadership")]], [[Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Strider (Marshes)"), Talent.getFromDatabase("Strong Back")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Waterman"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Fearless (Riverwardens)"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Strong Swimmer")], [Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Savvy"), Talent.getFromDatabase("Strider (Coastal)"), Talent.getFromDatabase("Sea Legs")]], [[Trapping.getFromDatabase("Large Sack"), Trapping.getFromDatabase("Mask or Scarves"), Trapping.getFromDatabase("Tinderbox"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("2 Barrels"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Row Boat")], [Trapping.getFromDatabase("River Runner"), Trapping.getFromDatabase("Speedy Riverboat")], [Trapping.getFromDatabase("Disguise Kit"), Trapping.getFromDatabase("Small Fleet of Riverboats")]], 0, "Riverfolk"),
            new Career("Stevedore", "With their sole right to load and unload vessels, Stevedore Guilds can slow or even stop trade. This grants power, with many docksides effectively ruled by the guilds. In larger towns, several gangs might violently compete for supremacy. Scowling Foremen deal with guild matters and blow their whistles to summon their gangs from riverside inns, either for fresh work or to defend their territory. A Stevedore might work alone in a riverside village, or in a large gang on a busy, chaotic city dockside. Sometimes they might be part of a criminal gang that just moves a bit of cargo on the side to cover their tracks. Some Stevedores are enforcers, making sure everyone else is working hard.", ["Dockhand", "Stevedore", "Foreman", "Dock Master"], ["Brass 3", "Silver 1", "Silver 3", "Silver 5"], [["T", "I", "WS"], ["S"], ["WP"], ["Int"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Urban)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Lore (Taxes)")]], [[Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Sturdy"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Guilders)"), Talent.getFromDatabase("Strong Legs"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Public Speaker")], [Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Read/Write")]], [[Trapping.getFromDatabase("Hand Weapon (Boat Hook)"), Trapping.getFromDatabase("Leather Gloves")], [Trapping.getFromDatabase("Guild Licence"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Pipe and Tobacco"), Trapping.getFromDatabase("Porter Cap")], [Trapping.getFromDatabase("Gang of Stevedores"), Trapping.getFromDatabase("Whistle")], [Trapping.getFromDatabase("Office and Staff"), Trapping.getFromDatabase("Writing Kit")]], 0, "Riverfolk"),
            new Career("Wrecker", "Sometimes the gods send riverfolk an unexpected windfall as goods wash up from an ill-fated vessel. Sometimes the gods need a helping hand: that’s where Wreckers come in. Laying devious traps and sending disorienting signals, Wreckers lure unwary river traffic onto sand banks and rocks, then loot the wreck, no matter how any surviving crew may protest. Some Wreckers pride themselves on their clever traps, making any wreck seem like an accident, and keeping a plausible distance from the actual looters. Some board ships by force and throw its crew overboard, expert at spotting under-armed boats with valuable cargo. These River Pirates are hunted by road and riverwardens, constantly moving to evade the authorities.", ["Cargo Scavenger", "Wrecker", "River Pirate", "Wrecker Captain"], ["Brass 2", "Brass 3", "Brass 5", "Silver 2"], [["WS", "S", "I"], ["WP"], ["BS"], ["Fel"]], [[Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Row"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Swim")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Set Trap")], [Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Ranged (Crossbow)"), Skill.getFromDatabase("Stealth (Rural)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Riverways)")]], [[Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Fisherman"), Talent.getFromDatabase("Strong Back")], [Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Strong Swimmer"), Talent.getFromDatabase("Trapper")], [Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Waterman")], [Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("In-fighter"), Talent.getFromDatabase("Pilot"), Talent.getFromDatabase("Warrior Born")]], [[Trapping.getFromDatabase("Crowbar"), Trapping.getFromDatabase("Large Sack"), Trapping.getFromDatabase("Leather Gloves")], [Trapping.getFromDatabase("Hand Weapon (Boat Hook)"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("Crossbow with 10 Bolts"), Trapping.getFromDatabase("Grappling Hook and Rope"), Trapping.getFromDatabase("Riverboat")], [Trapping.getFromDatabase("Fleet of Riverboats and Wrecker Crew"), Trapping.getFromDatabase("Keg of Ale"), Trapping.getFromDatabase("Manacles")]], 0, "Riverfolk"),

            new Career("Bawd", "Bawds guide folk to establishments offering a variety of illegal and immoral services. Though many Humans and Dwarfs have objections to such activities, most Halflings and High Elves are quite matter-offact about drug-dens, brothels, or other houses of vice. Bawds include drug-dealers, dancers, hustlers and artists’ models. Many famous masterpieces of the modern era have been posed for by Bawds plucked from the street. Traveling armies are followed by camp followers, with Bawds among them looking to make coin in any way they can. Ringleaders, proprietors of establishments where Bawds gather, can accrue significant empires providing services to all types of rogues, from fences who need discreet access to rich clients, to providing safe bolt-holes for gang bosses and crime lords.", ["Hustler", "Bawd", "Procurer", "Ringleader"], ["Brass 1", "Brass 3", "Silver 1", "Silver 3"], [["Ag", "Dex", "Fel"], ["I"], ["WP"], ["Int"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Entertain (Any)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intimidate")], [Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore(Local)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Language (any)"), Skill.getFromDatabase("Lore (Law)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Heraldry)")]], [[Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Gregarious")], [Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Carouser"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Resistance (Disease)")], [Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Suave")], [Talent.getFromDatabase("Briber"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Savvy")]], [[Trapping.getFromDatabase("Flask of Spirits")], [Trapping.getFromDatabase("Dose of Weirdroot"), Trapping.getFromDatabase("Quality Clothing")], [Trapping.getFromDatabase("A Ring of Hustlers")], [Trapping.getFromDatabase("Townhouse with Discreet Back Entrance"), Trapping.getFromDatabase("a Ring of Bawds")]], 0, "Rogues"),
            new Career("Charlatan", "A Charlatan traffics in trust, yet profits from treachery. By preying on emotions and psychological weaknesses, Charlatans offer their ‘mark’ a prize that is too good to be true. Social privilege provides no protection, and even the loftiest citizens can fall victim to a skilled Charlatan. In addition to a knack for lying, a lack of conscience is also of benefit to Charlatans. Charlatans include Swindlers, Con Artists, Gamblers, and other Scoundrels seeking to prey on the gullible. Halflings often operate distraction cons in small family groups. Young High Elves, slumming it with Humans, treat their cons as one big game, not motivated by profit, but to prove their superiority. Some experienced Charlatans work with artists, who forge documentation for a cut of any profits.", ["Swindler", "Charlatan", "Con Artist", "Scoundrel"], ["Brass 3", "Brass 5", "Silver 2", "Silver 4"], [["I", "Dex", "Fel"], ["WP"], ["Ag"], ["Int"]], [[Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Entertain(Storytelling)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Entertain (Acting)"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Language (Thief)"), Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Pick Lock"), Skill.getFromDatabase("Secret Signs (Thief)")], [Skill.getFromDatabase("Lore (Genealogy)"), Skill.getFromDatabase("Research")]], [[Talent.getFromDatabase("Cardsharp"), Talent.getFromDatabase("Diceman"), Talent.getFromDatabase("Etiquette (Any)"), Talent.getFromDatabase("Luck")], [Talent.getFromDatabase("Blather"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Fast Hands"), Talent.getFromDatabase("Secret Identity")], [Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Cat-tongued"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Read/Write")], [Talent.getFromDatabase("Gregarious"), Talent.getFromDatabase("Master of Disguise"), Talent.getFromDatabase("Nose for Trouble"), Talent.getFromDatabase("Suave")]], [[Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("2 Sets of Clothing"), Trapping.getFromDatabase("Deck of Cards"), Trapping.getFromDatabase("Dice")], [Trapping.getFromDatabase("1 Forged Document"), Trapping.getFromDatabase("2 Sets of Quality Clothing"), Trapping.getFromDatabase("Selection of Coloured Powders and Water"), Trapping.getFromDatabase("Selection of Trinkets and Charms")], [Trapping.getFromDatabase("Disguise Kit"), Trapping.getFromDatabase("Lock Picks"), Trapping.getFromDatabase("Multiple Forged Documents")], [Trapping.getFromDatabase("Forged Seal"), Trapping.getFromDatabase("Writing Kit")]], 0, "Rogues"),
            new Career("Fence", "A Fence buys thieves’ spoils and sells it on for profit, often to those unaware the goods are stolen. Successful Fences sometimes operate as pawn brokers, importers, or other merchants. Others prefer to remain mobile, trafficking only in portable items. Though the average Fence deals in goods and valuables, there are also well-informed specialists who focus on information and forbidden knowledge. Some Fences move stolen items across the Empire. A painting stolen in Altdorf is easier to sell in Talabheim to an audience unaware of the theft. When high profile items vanish, Fences are also the first individuals to be consulted by those looking to acquire them. Some Fences even take commissions from clients, connecting them with those who can steal to order.", ["Broker", "Fence", "Master Fence", "Black Marketeer"], ["Silver 1", "Silver 2", "Silver 3", "Silver 4"], [["I", "Ag", "Fel"], ["Dex"], ["Int"], ["WP"]], [[Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Secret Signs(Thief)"), Skill.getFromDatabase("Trade (Engraver)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Lore (Art)"), Skill.getFromDatabase("Lore (Local)")], [Skill.getFromDatabase("Lore (Heraldry)"), Skill.getFromDatabase("Research")]], [[Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Cardsharp"), Talent.getFromDatabase("Dealmaker"), Talent.getFromDatabase("Gregarious")], [Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Numismatics"), Talent.getFromDatabase("Savvy")], [Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Suave"), Talent.getFromDatabase("Super Numerate")], [Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Briber")]], [[Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Stolen Goods worth 3d10 Shillings")], [Trapping.getFromDatabase("Eye-glass"), Trapping.getFromDatabase("Trade Tools (Engraver)"), Trapping.getFromDatabase("Writing Kit")], [Trapping.getFromDatabase("Pawnbroker’s Shop")], [Trapping.getFromDatabase("Hired Muscle"), Trapping.getFromDatabase("Network of Informants"), Trapping.getFromDatabase("Warehouse")]], 0, "Rogues"),
            new Career("Grave Robber", "Trafficking in bodies and body parts is lucrative, with high demand from universities and physicians for fresh cadavers. As well as the scholarly market, corpses sometimes interred with all manner of valuables can be found beneath the ravenstones in the tombs of Morr’s Gardens. Because their labours are obvious, illegal, and sacrilegious, Grave Robbers usually work under cover of darkness. Body Snatchers have been known to cut out the middle man and take beggars or other unfortunates straight off the streets. Tomb Robbers avoid the legal dangers of looting the recently dead, and instead journey to ancient ruins and barrows, risking the restless dead and brigands alike. Peculiarly, some successful Treasure Hunters find themselves celebrated as heroes, their treasures sold to, and displayed by, the aristocracy. It’s even rumoured that the great wealth of one of the Knightly Orders came from a group of their members plundering a foreign tomb.", ["Body Snatcher", "Grave Robber", "Tomb Robber", "Treasure Hunter"], ["Brass 2", "Brass 3", "Silver 1", "Silver 5"], [["S", "I", "WP"], ["WS"], ["Dex"], ["Int"]], [[Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Any)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore(Medicine)"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Drive"), Skill.getFromDatabase("Lore (History)"), Skill.getFromDatabase("Pick Lock"), Skill.getFromDatabase("Set Trap")], [Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Trade (Engineer)")]], [[Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Strong Back")], [Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Resistance (Disease)"), Talent.getFromDatabase("Very Strong")], [Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Strike Mighty Blow"), Talent.getFromDatabase("Tenacious"), Talent.getFromDatabase("Tunnel Rat")], [Talent.getFromDatabase("Fearless (Undead)"), Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Trapper")]], [[Trapping.getFromDatabase("Crowbar"), Trapping.getFromDatabase("Handcart"), Trapping.getFromDatabase("Hooded Cloak"), Trapping.getFromDatabase("Tarpaulin")], [Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Spade"), Trapping.getFromDatabase("Storm Lantern and Oil")], [Trapping.getFromDatabase("Hand Weapon (Pick)"), Trapping.getFromDatabase("Horse and Cart"), Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Rope"), Trapping.getFromDatabase("Trade Tools (Thief)")], [Trapping.getFromDatabase("Bedroll"), Trapping.getFromDatabase("Maps"), Trapping.getFromDatabase("Tent"), Trapping.getFromDatabase("Trade Tools(Engineer)"), Trapping.getFromDatabase("Writing Kit")]], 0, "Rogues"),
            new Career("Outlaw", "Outlaws ply the roads of the Old World in search of vulnerable travellers and merchant caravans. They lead dangerous and often hardscrabble lives. Many do not see themselves as criminals, but as oppressed groups trying to live their lives free from outside constraints. Many Wood Elf outlaws fit this description, pushing back against the Humans proliferating at the edge of the forests, willing to take more drastic action than others of their kind. Particularly savvy and brutal Outlaws may form bands of their own, sometimes even uniting several bands under a single banner. Such Bandit Kings are feared and reviled by noble and peasant alike. Though few Outlaws discriminate in choosing their prey, some claim to protect the common man. These do-gooders focus their larceny on greedy nobles and, in return, locals may provide them with food, information, and safe harbour.", ["Brigand", "Outlaw", "Outlaw Chief", "Bandit King"], ["Brass 1", "Brass 2", "Brass 4", "Silver 2"], [["WS", "S", "T"], ["BS"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged(Bow)"), Skill.getFromDatabase("Stealth (Rural)")], [Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Lore (Empire)")]], [[Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Rover"), Talent.getFromDatabase("Flee!")], [Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Trapper")], [Talent.getFromDatabase("Rapid Reload"), Talent.getFromDatabase("Roughrider"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Very Resilient")], [Talent.getFromDatabase("Deadeye Shot"), Talent.getFromDatabase("Fearless (Road Wardens)"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Robust")]], [[Trapping.getFromDatabase("Bedroll"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Tinderbox")], [Trapping.getFromDatabase("Bow with 10 Arrows"), Trapping.getFromDatabase("Shield"), Trapping.getFromDatabase("Tent")], [Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Sleeved Mail Shirt"), Trapping.getFromDatabase("Band of Outlaws")], [Trapping.getFromDatabase("‘Fiefdom’ of Outlaw Chiefs"), Trapping.getFromDatabase("Lair")]], 0, "Rogues"),
            new Career("Racketeer", "Racketeers extort money from law-abiding citizens and merchants, providing ‘protection’ or some similar fraudulent ‘service’. If the ‘fees’ are not paid on time, the victims, their families, and their livelihoods are at considerable risk. Large gangs bribe or intimidate local authorities to ignore their activities; their Thugs are always willing to kill — or worse — to keep business running smoothly. Thugs are employed to collect debts of all kind, especially those incurred through gambling losses or high-interest-rate loans. In a world brimming with poverty, the promise of easy wealth is an allure countless fools are unable to ignore. The more organised the graft, the larger and more complex the organisations running them become. While the smallest rackets are run by small gangs with limited territory beyond a building or two, the largest can span cities or even entire provinces, and the Crime Lords who run them can wield extraordinary power.", ["Thug", "Racketeer", "Gang Boss", "Crime Lord"], ["Brass 3", "Brass 5", "Silver 3", "Silver 5"], [["WS", "S", "T"], ["Fel"], ["WP"], ["Int"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Melee (Brawling)"), Skill.getFromDatabase("Stealth (Urban)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Language (Estalian or Tilean)"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Crossbow)")], [Skill.getFromDatabase("Lore (Law)"), Skill.getFromDatabase("Lore (Politics)")]], [[Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Strike Mighty Blow")], [Talent.getFromDatabase("Embezzle"), Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Warrior Born")], [Talent.getFromDatabase("Fearless (Watchmen)"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Resistance (Poison)"), Talent.getFromDatabase("Robust")], [Talent.getFromDatabase("Commanding Presence"), Talent.getFromDatabase("Kingpin"), Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Wealthy")]], [[Trapping.getFromDatabase("Knuckledusters"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Hat"), Trapping.getFromDatabase("Mail Shirt")], [Trapping.getFromDatabase("Crossbow Pistol with 10 Bolts"), Trapping.getFromDatabase("Gang of Thugs and Racketeers"), Trapping.getFromDatabase("Lair")], [Trapping.getFromDatabase("Network of Informers"), Trapping.getFromDatabase("Quality Clothing and Hat"), Trapping.getFromDatabase("Subordinate Gang Bosses")]], 0, "Rogues"),
            new Career("Thief", "Thieves steal all manner of wealth and goods from their fellow man. From the lowliest footpad to the wiliest burglar, the thought of an honest day’s work in return for a respectable wage is little more than a bad joke. Thieves often organize themselves into gangs alongside charlatans, racketeers, and fences to further their mutual wealth. Bitter feuds between such illicit organisations have been known to last for years or even decades. The lowliest Thieves target individuals, picking pockets or waylaying victims in rat-infested alleyways. Burglars avoid confrontation by breaking into businesses and residences, carrying off portable valuables. More ambitious thieves scope out their targets for days or weeks, even going so far as to infiltrate their target locations to get a more precise lay of the land. Working with other professional burglars, such experts can organise heists of which their lesser peers can only dream.", ["Prowler", "Thief", "Master Thief", "Cat Burglar"], ["Brass 1", "Brass 3", "Brass 5", "Silver 3"], [["I", "Ag", "WP"], ["Dex"], ["S"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Stealth (Urban)")], [Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore (Local)"), Skill.getFromDatabase("Pick Lock"), Skill.getFromDatabase("Secret Signs (Thief)"), Skill.getFromDatabase("Sleight of Hand")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Ranged (Crossbow)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Set Trap")]], [[Talent.getFromDatabase("Alley Cat"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Flee!"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Break and Enter"), Talent.getFromDatabase("Etiquette (Criminals)"), Talent.getFromDatabase("Fast Hands"), Talent.getFromDatabase("Shadow")], [Talent.getFromDatabase("Night Vision"), Talent.getFromDatabase("Nimble Fingered"), Talent.getFromDatabase("Step Aside"), Talent.getFromDatabase("Trapper")], [Talent.getFromDatabase("Catfall"), Talent.getFromDatabase("Scale Sheer Surface"), Talent.getFromDatabase("Strong Legs"), Talent.getFromDatabase("Wealthy")]], [[Trapping.getFromDatabase("Crowbar"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Sack")], [Trapping.getFromDatabase("Trade Tools (Thief)"), Trapping.getFromDatabase("Rope")], [Trapping.getFromDatabase("Crossbow Pistol with 10 Bolts"), Trapping.getFromDatabase("Throwing Knives")], [Trapping.getFromDatabase("Dark Clothing"), Trapping.getFromDatabase("Grappling Hook"), Trapping.getFromDatabase("Mask or Scarves")]], 0, "Rogues"),
            new Career("Witch", "Any with the rare talent to wield magic must, by law, be trained by Magisters of the College of Magic. Not everyone accepts such a fate; some hide their powers or go on the run. Such folk are called Witches. They risk insanity and damnation as magic burns through them without correct tutelage, and rarely understand the nature of the forces in which they dabble. Others embrace their burgeoning powers wholeheartedly, accepting the risks. Witches come in all varieties, with the talent to wield magic playing no favourites. Some are benign figures simply seeking freedom. Others are nobles refusing to accept they are Witches, for to do so is to be disinherited. Yet others are terrified of what they may become, so run away. Whatever the case, few will admit what they are, as all risk burning by over-zealous Sigmarites.", ["Hexer", "Witch", "Wyrd", "Warlock"], ["Brass 1", "Brass 2", "Brass 3", "Brass 5"], [["WS", "T", "WP"], ["I"], ["Fel"], ["Int"]], [[Skill.getFromDatabase("Channelling"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (Magick)"), Skill.getFromDatabase("Sleight of Hand"), Skill.getFromDatabase("Stealth (Rural)")], [Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Pole-Arm)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Trade (Herbalist)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Lore (Dark Magic)")], [Skill.getFromDatabase("Lore (Daemonology)"), Skill.getFromDatabase("Lore (Magick")]], [[Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Instinctive Diction"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Petty Magic")], [Talent.getFromDatabase("Arcane Magic (Witchery)"), Talent.getFromDatabase("Attractive"), Talent.getFromDatabase("Sixth Sense"), Talent.getFromDatabase("Witch!")], [Talent.getFromDatabase("Animal Affinity"), Talent.getFromDatabase("Fast Hands"), Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Magical Sense")], [Talent.getFromDatabase("Aethyric Attunement"), Talent.getFromDatabase("Luck"), Talent.getFromDatabase("Strong-minded"), Talent.getFromDatabase("Very Resilient")]], [[Trapping.getFromDatabase("Candles"), Trapping.getFromDatabase("Chalk"), Trapping.getFromDatabase("Doll"), Trapping.getFromDatabase("Pins")], [Trapping.getFromDatabase("Quarterstaff"), Trapping.getFromDatabase("Sack"), Trapping.getFromDatabase("Selection of Herbs"), Trapping.getFromDatabase("Trade Tools (Herbalist)")], [Trapping.getFromDatabase("Backpack"), Trapping.getFromDatabase("Cloak with Several Pockets"), Trapping.getFromDatabase("Lucky Charm")], [Trapping.getFromDatabase("Robes"), Trapping.getFromDatabase("Skull")]], 0, "Rogues"),

            new Career("Cavalryman", "Whether it’s units of Pistoliers, Outriders, Demilancers, Horse Archers, or similar, Cavalrymen are deployed for maximum strategic advantage. On campaign, that means scouting, raiding, harassing the enemy lines, or defending foragers. On the battlefield, they are also particularly versatile, able to strike quickly and melt away. For speed of movement, scouting, versatility, and sheer élan, Cavalrymen cannot be rivalled. Swift, lightly-armoured cavalry is employed by most armies, including forces of the cults and less formal armed bands including mercenaries or private armies. Bretonnian armies make use of mounted men at arms, while Wood Elf Gladeriders are some of the most feared light cavalry in the Old World.", ["Horseman", "Cavalryman", "Cavalry Sergeant", "Cavalry Officer"], ["Silver 2", "Silver 4", "Gold 1", "Gold 2"], [["WS", "S", "Ag"], ["BS"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Language(Battle Tongue)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Outdoor Survival"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ride(Horse)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Melee(Cavalry)"), Skill.getFromDatabase("Ranged (Blackpowder)")], [Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Warfare)")], [Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Lore (Heraldry)")]], [[Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Crack the Whip"), Talent.getFromDatabase("Lightning Reflexes"), Talent.getFromDatabase("Roughrider")], [Talent.getFromDatabase("Etiquette (Soldiers)"), Talent.getFromDatabase("Gunner"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Trick Riding")], [Talent.getFromDatabase("Combat Reflexes"), Talent.getFromDatabase("Fast Shot"), Talent.getFromDatabase("Hatred (Any)"), Talent.getFromDatabase("War Leader")], [Talent.getFromDatabase("Accurate Shot"), Talent.getFromDatabase("Inspiring"), Talent.getFromDatabase("Reaction Strike"), Talent.getFromDatabase("Robust")]], [[Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack")], [Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Demilance"), Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Light Warhorse with Saddle and Tack"), Trapping.getFromDatabase("Pistol with 10 Shots"), Trapping.getFromDatabase("Shield")], [Trapping.getFromDatabase("Sash")], [Trapping.getFromDatabase("Deck of Cards"), Trapping.getFromDatabase("Quality Clothing")]], 0, "Warriors"),
            new Career("Guard", "The best way to keep something safe is to post a guard. Guarding looks easy enough, it’s usually standing around doing very little. Guards live and die, quite literally, by how they behave during that one moment when they are required to spring into action. The best can command high wages and are entrusted with the lives of the Empire’s finest personages and most valuable items. Guards are everywhere, from the Imperial palace down to bouncers who stand outside taverns all night, ready to throw drunkards into the street. They also include grave wardens — those who defend Morr’s Gardens in the dead of night, watchful for grave robbers — and temple guards who defend holy sites and important priests. Merchants often employ many Guards to defend their valuable stock. Some claim bodyguards have it best because they stay close to their esteemed employers, and often partake of a life far beyond that which their station would normally allow.", ["Sentry", "Guard", "Honour Guard", "Guard Officer"], ["Silver 1", "Silver 2", "Silver 3", "Silver 5"], [["T", "WS", "Ag"], ["I"], ["S"], ["Int"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain(Storytelling)"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee(Pole-Arm)"), Skill.getFromDatabase("Ranged (Bow)")], [Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Language (Battle Tongue)"), Skill.getFromDatabase("Lore (Etiquette)"), Skill.getFromDatabase("Melee (Two-Handed)")], [Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore (Warfare)")]], [[Talent.getFromDatabase("Diceman"), Talent.getFromDatabase("Etiquette (Servants)"), Talent.getFromDatabase("Strike to Stun"), Talent.getFromDatabase("Tenacious")], [Talent.getFromDatabase("Relentless"), Talent.getFromDatabase("Reversal"), Talent.getFromDatabase("Shieldsman"), Talent.getFromDatabase("Strike Mighty Blow")], [Talent.getFromDatabase("Fearless (Intruders)"), Talent.getFromDatabase("Jump Up"), Talent.getFromDatabase("Stout-hearted"), Talent.getFromDatabase("Unshakeable")], [Talent.getFromDatabase("Combat Master"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Robust")]], [[Trapping.getFromDatabase("Buckler"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Storm Lantern with Oil")], [Trapping.getFromDatabase("Bow with 10 Arrows"), Trapping.getFromDatabase("Sleeved Mail Shirt"), Trapping.getFromDatabase("Shield"), Trapping.getFromDatabase("Spear")], [Trapping.getFromDatabase("Great Weapon or Halberd"), Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Uniform")], [Trapping.getFromDatabase("Breastplate")]], 0, "Warriors"),
            new Career("Knight", "Many believe heavy cavalry are the pre-eminent warriors of the Old World. A massed charge is an awesome sight, but even alone a Knight can stand as a one-person army. There are many Knightly Orders in the Empire, the most famous including the Reiksguard, the White Wolves, the Knights Panther, and the Knights Griffon, each of which have their own gloried history and mighty heroes. Most Empire Knights belong to secular knightly orders, partly because training heavy lancers is too prohibitively expensive for most nobles. The templar orders, those dedicated to the service of a single deity are just as common but are somewhat more independent. Alongside these are an uncounted number of free-lances, mercenary knights, and disgraced knights, most of whom sell their lance to the highest bidder.", ["Squire", "Knight", "First Knight", "Knight of the Inner Circle"], ["Silver 3", "Silver 5", "Gold 2", "Gold 4"], [["S", "I", "Ag"], ["WS"], ["WP"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Charm Animal"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore(Heraldry)"), Skill.getFromDatabase("Melee (Cavalry)"), Skill.getFromDatabase("Ride (Horse)"), Skill.getFromDatabase("Trade (Farrier)")], [Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language(Battle Tongue)"), Skill.getFromDatabase("Melee (Any)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Warfare)")], [Skill.getFromDatabase("Lore (Any)"), Skill.getFromDatabase("Secret Signs (Knightly Order)")]], [[Talent.getFromDatabase("Etiquette (any)"), Talent.getFromDatabase("Roughrider"), Talent.getFromDatabase("Sturdy"), Talent.getFromDatabase("Warrior Born")], [Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Shieldsman"), Talent.getFromDatabase("Strike Mighty Blow")], [Talent.getFromDatabase("Fearless (Any)"), Talent.getFromDatabase("Stout-hearted"), Talent.getFromDatabase("Unshakeable"), Talent.getFromDatabase("War Leader")], [Talent.getFromDatabase("Disarm"), Talent.getFromDatabase("Inspiring"), Talent.getFromDatabase("Iron Will"), Talent.getFromDatabase("Strike to Injure")]], [[Trapping.getFromDatabase("Leather Jack"), Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Shield"), Trapping.getFromDatabase("Trade Tools (Farrier)")], [Trapping.getFromDatabase("Destrier with Saddle and Tack"), Trapping.getFromDatabase("Melee Weapon(Any)"), Trapping.getFromDatabase("Lance"), Trapping.getFromDatabase("Plate Armour and Helm")], [Trapping.getFromDatabase("Barding"), Trapping.getFromDatabase("Small Unit of Knights")], [Trapping.getFromDatabase("Plumed Great Helm"), Trapping.getFromDatabase("Squire"), Trapping.getFromDatabase("Large Unit of Knights or Several Small Units of Knights")]], 0, "Warriors"),
            new Career("Pit Fighter", "Watching fights is a popular pastime. In the cities, organised fights take place every night. There is money to be made charging spectators, and even more in gambling on the result. Winners earn coin and are celebrated as local heroes. Losers are hurt or killed. Because pit fighting is officially frowned upon, the fights are often controlled by criminal gangs, but the rich love to slum it on occasion, especially if it involves a little bloodshed. The gladiators of Tilea are the most renowned pit fighters, though the chain-fighters of Marienburg and bear-wrestlers of Kislev draw a crowd. Pugilists and wrestlers might work a travelling fair, challenging the public to survive three minutes in the ring with them, or they might fight a celebrated opponent in front of cheering crowds. Knives, clubs, chains, boxing, wrestling, there is an almost endless variation of styles and codes a Pit Fighter might adopt.", ["Pugilist", "Pit Fighter", "Pit Champion", "Pit Legend"], ["Brass 4", "Silver 2", "Silver 5", "Gold 2"], [["WS", "S", "T"], ["I"], ["Ag"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Melee (Brawling)")], [Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Melee (Flail or Two-Handed)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Entangling)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Lore (Anatomy)"), Skill.getFromDatabase("Perform(Fight)")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Ranged (Any)")]], [[Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("In-fighter"), Talent.getFromDatabase("Iron Jaw"), Talent.getFromDatabase("Reversal")], [Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Combat Reflexes"), Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Shieldsman")], [Talent.getFromDatabase("Combat Master"), Talent.getFromDatabase("Disarm"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Robust")], [Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Implacable"), Talent.getFromDatabase("Reaction Strike")]], [[Trapping.getFromDatabase("Bandages"), Trapping.getFromDatabase("Knuckledusters"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Flail or Great Weapon"), Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Net or Whip"), Trapping.getFromDatabase("Shield or Buckler")], [Trapping.getFromDatabase("Breast Plate"), Trapping.getFromDatabase("Helmet")], [Trapping.getFromDatabase("Quality Helmet")]], 0, "Warriors"),
            new Career("Protagonist", "Protagonists live by their wits and their muscles and are not generally fussy about the sort of work they take on. A merchant might want to frighten their business rival. An employer might decide his workers need a bit of encouragement to get a job done quicker. A noble might want his daughter’s no-good suitor to be frightened off. Protagonists are the ones they turn to, and those with the worst reputation get the best jobs. A Protagonist could be the brute in the local bar everyone knows will bully for coin, or with the reputation for unflinching violence. Some Protagonists have their own code of what they will or won’t do; others care for nothing but the coin. Some are simple bullies who resort to picking arguments and fights with likely looking targets to see if they can score any money from the situation.", ["Braggart", "Protagonist", "Hitman", "Assassin"], ["Brass 2", "Silver 1", "Silver 4", "Gold 1"], [["T", "WS", "Ag"], ["I"], ["BS"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Entertain (Taunt)"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Haggle"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Melee (Any)")], [Skill.getFromDatabase("Bribery"), Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Navigation"), Skill.getFromDatabase("Ranged (Throwing)")], [Skill.getFromDatabase("Entertain (Acting)"), Skill.getFromDatabase("Ranged (Crossbow)")]], [[Talent.getFromDatabase("In-fighter"), Talent.getFromDatabase("Dirty Fighting"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Warrior Born")], [Talent.getFromDatabase("Combat Reflexes"), Talent.getFromDatabase("Criminal"), Talent.getFromDatabase("Reversal"), Talent.getFromDatabase("Strike to Stun")], [Talent.getFromDatabase("Careful Strike"), Talent.getFromDatabase("Disarm"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Relentless")], [Talent.getFromDatabase("Accurate Shot"), Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Strike to Injure")]], [[Trapping.getFromDatabase("Hood or Mask"), Trapping.getFromDatabase("Knuckledusters"), Trapping.getFromDatabase("Leather Jack")], [Trapping.getFromDatabase("Hand Weapon"), Trapping.getFromDatabase("Mail Shirt"), Trapping.getFromDatabase("Riding Horse with Saddle and Tack"), Trapping.getFromDatabase("Shield")], [Trapping.getFromDatabase("Cloak"), Trapping.getFromDatabase("Garotte"), Trapping.getFromDatabase("Poison"), Trapping.getFromDatabase("Throwing Knives")], [Trapping.getFromDatabase("Crossbow with 10 shots"), Trapping.getFromDatabase("Disguise Kit")]], 0, "Warriors"),
            new Career("Soldier", "By the command of Emperor Magnus the Pious after the Great War Against Chaos, all provinces of the Empire had to maintain a standing State Army. Soldiers are the mainstay of these armies, trained to fight as part of a larger group with individual skill supplemented by strength in numbers. Rarely encouraged to think for themselves, Soldiers are famous for their stoic fatalism as they are ordered from pillar to post in the service of their betters. Soldiers could be archers, crossbowmen, halberdiers, handgunners, swordsmen, or spearmen, and that’s just in a typical State regiment. Dwarfs employ soldiers like Hammerers and Thunderers, while Elven rank and file are usually archers and spearmen. There are many other Soldiers, such as Mercenaries, local Militias (which are rarely better than Recruits), private armies, cult forces, and more.", ["Recruit", "Soldier", "Sergeant", "Officer"], ["Silver 1", "Silver 3", "Silver 5", "Gold 1"], [["T", "WS", "WP"], ["BS"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Athletics"), Skill.getFromDatabase("Climb"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Language(Battle Tongue)"), Skill.getFromDatabase("Melee (Basic)"), Skill.getFromDatabase("Play (Drum or Fife)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Gossip"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Ranged (Any)"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Perception")], [Skill.getFromDatabase("Lore (Warfare)"), Skill.getFromDatabase("Navigation")]], [[Talent.getFromDatabase("Diceman"), Talent.getFromDatabase("Marksman"), Talent.getFromDatabase("Strong Back"), Talent.getFromDatabase("Warrior Born")], [Talent.getFromDatabase("Drilled"), Talent.getFromDatabase("Etiquette (Soldiers)"), Talent.getFromDatabase("Rapid Reload"), Talent.getFromDatabase("Shieldsman")], [Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Enclosed Fighter"), Talent.getFromDatabase("Unshakeable"), Talent.getFromDatabase("War Leader")], [Talent.getFromDatabase("Inspiring"), Talent.getFromDatabase("Public Speaker"), Talent.getFromDatabase("Seasoned Traveller"), Talent.getFromDatabase("Stout-hearted")]], [[Trapping.getFromDatabase("Dagger"), Trapping.getFromDatabase("Leather Breastplate"), Trapping.getFromDatabase("Uniform")], [Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Helmet"), Trapping.getFromDatabase("Weapon (Any)")], [Trapping.getFromDatabase("Symbol of Rank"), Trapping.getFromDatabase("Unit of Troops")], [Trapping.getFromDatabase("Letter of Commission"), Trapping.getFromDatabase("Light Warhorse with Saddle and Tack"), Trapping.getFromDatabase("Map"), Trapping.getFromDatabase("Orders"), Trapping.getFromDatabase("Unit of Soldiers"), Trapping.getFromDatabase("Quality Uniform"), Trapping.getFromDatabase("Symbol of Rank")]], 0, "Warriors"),
            new Career("Slayer", "When Dwarfs suffer an unacceptable shame and lose their honour, they take the Slayer’s Oath and walk the path of Grimnir, their ancestral god of warriors. Covering their bodies in tattoos, shaving the sides of their head, dying their remaining hair a brilliant orange, and spiking it with animal grease, they set off into the world, axe in hand, seeking a glorious death. Slayers wander the Old World hunting deadly beasts, such as Trolls, Giants, or Dragons. Because of the shame they carry, many suffer from bouts of depression, glutting themselves on food, alcohol, or stronger stimulants. The more foes Slayers face and survive, the more dangerous and crazed they become, hunting progressively deadlier creatures in the hopes of finding something that can kill them.", ["Troll Slayer", "Giant Slayer", "Dragon Slayer", "Daemon Slayer"], ["Brass 2", "Brass 2", "Brass 2", "Brass 2"], [["WS", "S", "WP"], ["T"], ["Ag"], ["I"]], [[Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Gamble"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Lore (Trolls)"), Skill.getFromDatabase("Melee (Basic)")], [Skill.getFromDatabase("Evaluate"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language (Battle Tongue)"), Skill.getFromDatabase("Lore(Giants)"), Skill.getFromDatabase("Melee (Two-Handed)"), Skill.getFromDatabase("Outdoor Survival")], [Skill.getFromDatabase("Entertain (Storytelling)"), Skill.getFromDatabase("Lore (Dragons)"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ranged (Throwing)")], [Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Lore (Chaos)")]], [[Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Fearless (Everything)"), Talent.getFromDatabase("Frenzy"), Talent.getFromDatabase("Slayer")], [Talent.getFromDatabase("Hardy"), Talent.getFromDatabase("Implacable"), Talent.getFromDatabase("Menacing"), Talent.getFromDatabase("Reversal")], [Talent.getFromDatabase("Ambidextrous"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Relentless"), Talent.getFromDatabase("Robust")], [Talent.getFromDatabase("Combat Master"), Talent.getFromDatabase("Frightening"), Talent.getFromDatabase("Strike Mighty Blow"), Talent.getFromDatabase("Very Strong")]], [[Trapping.getFromDatabase("Axe"), Trapping.getFromDatabase("Flask of Spirits"), Trapping.getFromDatabase("Shame"), Trapping.getFromDatabase("Tattoos")], [Trapping.getFromDatabase("Great Axe"), Trapping.getFromDatabase("Jewellery"), Trapping.getFromDatabase("Troll’s Head")], [Trapping.getFromDatabase("Giant’s Head"), Trapping.getFromDatabase("Throwing Axes")], [Trapping.getFromDatabase("Dragon’s Head")]], 0, "Warriors"),
            new Career("Warrior Priest", "Some cults of the Empire have clerics trained for war. In the Reikland, the Warrior Priests of Sigmar are the most common example of this, and most armies of the Empire are accompanied by hammerbearing priests encouraging the soldiers in the name of Sigmar. But other cults, especially those of Myrmidia, Ulric, Taal, and Morr, have Warrior Priests of their own, each with their unique views as to how war should be conducted. Away from the battlefield, Warrior Priests are also expected to administer to soldiers’ spiritual wellbeing, as well as making sure morale stays high and discipline is ordered. Some orders of Warrior Priests swear oaths to roam the Empire, seeking heresy wherever it lies, helping where they can. Others prefer not to join armies, but lead them…", ["Novitiate", "Warrior Priest", "Priest Sergeant", "Priest Captain"], ["Brass 2", "Silver 2", "Silver 3", "Silver 4"], [["T", "WS", "WP"], ["S"], ["I"], ["Fel"]], [[Skill.getFromDatabase("Cool"), Skill.getFromDatabase("Dodge"), Skill.getFromDatabase("Endurance"), Skill.getFromDatabase("Heal"), Skill.getFromDatabase("Leadership"), Skill.getFromDatabase("Lore(Theology)"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Pray")], [Skill.getFromDatabase("Charm"), Skill.getFromDatabase("Entertain (Speeches)"), Skill.getFromDatabase("Intimidate"), Skill.getFromDatabase("Language(Battle Tongue)"), Skill.getFromDatabase("Melee (Any)"), Skill.getFromDatabase("Ranged (Any)")], [Skill.getFromDatabase("Animal Care"), Skill.getFromDatabase("Intuition"), Skill.getFromDatabase("Perception"), Skill.getFromDatabase("Ride (Horse)")], [Skill.getFromDatabase("Consume Alcohol"), Skill.getFromDatabase("Lore (Warfare)")]], [[Talent.getFromDatabase("Bless (Any)"), Talent.getFromDatabase("Etiquette (Cultists)"), Talent.getFromDatabase("Read/Write"), Talent.getFromDatabase("Strong-minded")], [Talent.getFromDatabase("Dual Wielder"), Talent.getFromDatabase("Inspiring"), Talent.getFromDatabase("Invoke (Any)"), Talent.getFromDatabase("Seasoned Traveller")], [Talent.getFromDatabase("Combat Aware"), Talent.getFromDatabase("Holy Visions"), Talent.getFromDatabase("Pure Soul"), Talent.getFromDatabase("Stout-hearted")], [Talent.getFromDatabase("Fearless (Any)"), Talent.getFromDatabase("Furious Assault"), Talent.getFromDatabase("Holy Hatred"), Talent.getFromDatabase("War Leader")]], [[Trapping.getFromDatabase("Book (Religion)"), Trapping.getFromDatabase("Leather Jerkin"), Trapping.getFromDatabase("Religious Symbol"), Trapping.getFromDatabase("Robes"), Trapping.getFromDatabase("Weapon (Any Melee)")], [Trapping.getFromDatabase("Breastplate"), Trapping.getFromDatabase("Weapon (Any)")], [Trapping.getFromDatabase("Light Warhorse with Saddle and Tack")], [Trapping.getFromDatabase("Religious Relic")]], 0, "Warriors")
        ];
        return careers;
    }

    static generateFromString(dataString) {
        var data = dataString.split("#");

        var name = data[0];

        // console.log(name);

        var description = data[1];
        var subNames = data[2].split("[");
        var statuses = data[3].split("[");

        var statData = data[4].split("[")
        var statMatrix = [];
        for (var i = 0; i < statData.length; i++) {
            statMatrix.push(statData[i].split("{"));
        }

        var skillMatrixData = data[5].split("[")
        var skillMatrix = [[], [], [], []];
        for (var i = 0; i < skillMatrixData.length; i++) {
            var skillMatrixSubData = skillMatrixData[i].split("{");
            for (var j = 0; j < skillMatrixSubData.length; j++) {
                skillMatrix[i].push(Skill.generateFromString(skillMatrixSubData[j]));
            }
        }

        var talentMatrixData = data[6].split("[")
        //console.log(data[6]);
        var talentMatrix = [[], [], [], []];
        for (var i = 0; i < talentMatrixData.length; i++) {
            var talentMatrixSubData = talentMatrixData[i].split("{");
            //console.log(talentMatrixSubData);
            for (var j = 0; j < talentMatrixSubData.length; j++) {
                talentMatrix[i].push(Talent.generateFromString(talentMatrixSubData[j]));
            }
        }

        var trappingMatrixData = data[7].split("[")
        var trappingMatrix = [[], [], [], []];
        for (var i = 0; i < trappingMatrixData.length; i++) {
            var trappingMatrixSubData = trappingMatrixData[i].split("{");
            for (var j = 0; j < trappingMatrixSubData.length; j++) {
                trappingMatrix[i].push(Trapping.generateFromString(trappingMatrixSubData[j]));
            }
        }

        var level = parseInt(data[8]);
        var careerType = data[9];

        return new Career(name, description, subNames, statuses, statMatrix, skillMatrix, talentMatrix, trappingMatrix, level, careerType);
    }

    toString() {
        var str = this.name + "#" + this.description + "#";

        for (var i = 0; i < this.subNames.length; i++) {
            str += this.subNames[i].toString() + ((i == this.subNames.length - 1) ? "#" : "[");
        }

        for (var i = 0; i < this.statuses.length; i++) {
            str += this.statuses[i].toString() + ((i == this.statuses.length - 1) ? "#" : "[");
        }

        for (var i = 0; i < this.statMatrix.length; i++) {
            for (var j = 0; j < this.statMatrix[i].length; j++) {
                str += this.statMatrix[i][j].toString() + ((j == this.statMatrix[i].length - 1) ? "" : "{");
            }
            str += ((i == this.statMatrix.length - 1) ? "#" : "[");
        }

        for (var i = 0; i < this.skillMatrix.length; i++) {
            for (var j = 0; j < this.skillMatrix[i].length; j++) {
                str += this.skillMatrix[i][j].toString() + ((j == this.skillMatrix[i].length - 1) ? "" : "{");
            }
            str += ((i == this.skillMatrix.length - 1) ? "#" : "[");
        }

        for (var i = 0; i < this.talentMatrix.length; i++) {
            for (var j = 0; j < this.talentMatrix[i].length; j++) {
                str += this.talentMatrix[i][j].toString() + ((j == this.talentMatrix[i].length - 1) ? "" : "{");
            }
            str += ((i == this.talentMatrix.length - 1) ? "#" : "[");
        }

        for (var i = 0; i < this.trappingMatrix.length; i++) {
            for (var j = 0; j < this.trappingMatrix[i].length; j++) {
                str += this.trappingMatrix[i][j].toString() + ((j == this.trappingMatrix[i].length - 1) ? "" : "{");
            }
            str += ((i == this.trappingMatrix.length - 1) ? "#" : "[");
        }

        str += this.level.toString() + "#";

        str += this.careerType;

        return str;
    }
}
//#endregion

//#region Testing
////////////////////////////////////////////////////////////////////////////////////
//Testing
////////////////////////////////////////////////////////////////////////////////////

function testStringConversionTalent(a, testName) {
    var b = Talent.generateFromString(a.toString());
    if (a.equals(b)) {
        //console.log(testName + " passed...\n");
        //console.log(a.toString() + " == " + b.toString());
    }
    else {
        console.log(testName + " failed...\n")
        console.log(a.toString() + " != " + b.toString());
        return false;
    }
    return true;
}

function testStringConversionSkill(a, testName) {
    var b = Skill.generateFromString(a.toString());
    if (a.equals(b)) {
        //console.log(testName + " passed...\n");
        //console.log(a.toString() + " == " + b.toString());
    }
    else {
        console.log(testName + " failed...\n")
        console.log(a.toString() + " != " + b.toString());
        return false;
    }
    return true;
}

function testStringConversionCareer(a, testName) {
    var b = Career.generateFromString(a.toString());
    if (a.equals(b)) {
        //console.log(testName + " passed...\n");
        //console.log(a.toString() + " == " + b.toString());
    }
    else {
        console.log(testName + " failed...\n")
        //console.log(a.toString() + " != " + b.toString());
        return false;
    }
    return true;
}

function testStringConversionCharacter(a, testName) {
    var b = Character.generateFromString(a.toString());
    if (a.equals(b)) {
        //console.log(testName + " passed...\n");
        //console.log(a.toString() + " == " + b.toString());
    }
    else {
        console.log(testName + " failed...\n")
        console.log(a.toString() + " != " + b.toString());
        return false;
    }
    return true;
}

function testStringConversionTrapping(a, testName) {
    var b = Trapping.generateFromString(a.toString());
    if (a.equals(b)) {
        //console.log(testName + " passed...\n");
        //console.log(a.toString() + " == " + b.toString());
    }
    else {
        console.log(testName + " failed...\n")
        console.log(a.toString() + " != " + b.toString());
        return false;
    }
    return true;
}

function testSkill() {
    var skills = Skill.getAllSkills();
    for (var i = 0; i < skills.length; i++) {
        if (!testStringConversionSkill(skills[i], "Skill to String Test nr" + (i + 1) + ":"))
            console.log("Skill: " + skills[i] + " failed");
    }
}

function testTalent() {
    var talents = Talent.getAllTalents();
    for (var i = 0; i < talents.length; i++) {
        if (!testStringConversionTalent(talents[i], "Talent to String Test nr" + (i + 1) + ":"))
            console.log("Talent: " + talents[i].name + " failed");
    }
}

function testCareer() {
    var careers = Career.getAllCareers();
    for (var i = 0; i < careers.length; i++) {
        if (!testStringConversionCareer(careers[i], "Career to String Test nr" + (i + 1) + ":"))
            console.log("Career: " + careers[i].name + " failed");
    }
}

function testRandomCareerHuman(max) {
    var h = new Human();
    var ill = ["Slayer"];

    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var s = Career.getRandomCareer(h.jobArray).name;
        if (ill.includes(s))
            console.log("Human career:" + s + "shouldnt be generated");
    }
}

function testRandomCareerHalfling(max) {
    var h = new Halfling();
    var ill = ["Nun", "Priest", "Wizard", "Duellist", "Noble", "Hedge Witch", "Mystic", "Flagellant", "Witch Hunter", "Wrecker", "Witch", "Cavalryman", "Knight", "Protagonist", "Slayer", "Warrior Priest"];

    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var s = Career.getRandomCareer(h.jobArray).name;
        if (ill.includes(s))
            console.log("Halfling career:" + s + "shouldnt be generated");
    }
}

function testRandomCareerDwarf(max) {
    var h = new Dwarf();
    var ill = ["Nun", "Priest", "Wizard", "Hedge Witch", "Herbalist", "Mystic", "Flagellant", "Road Warden", "Witch Hunter", "Riverwarden", "Bawd", "Charlatan", "Grave Robber", "Witch", "Cavalryman", "Knight", "Warrior Priest"];

    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var s = Career.getRandomCareer(h.jobArray).name;
        if (ill.includes(s))
            console.log("Dwarf career:" + s + "shouldnt be generated");
    }
}

function testRandomCareerHighElf(max) {
    var h = new HighElf();
    var ill = ["Engineer", "Nun", "Priest", "Agitator", "Beggar", "Rat Catcher", "Servant", "Bailiff", "Hedge Witch", "Miner", "Mystic", "Villager", "Coachman", "Flagellant", "Pedlar",
        "Road Warden", "Witch Hunter", "Huffer", "Riverwarden", "Riverwoman", "Stevedore", "Wrecker", "Fence", "Grave Robber", "Racketeer", "Thief", "Witch", "Slayer", "Warrior Priest"];

    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var s = Career.getRandomCareer(h.jobArray).name;
        if (ill.includes(s))
            console.log("High elf career:" + s + "shouldnt be generated");
    }
}

function testRandomCareerWoodElf(max) {
    var h = new WoodElf();
    var ill = ["Apthecary", "Engineer", "Lawyer", "Nun", "Physician", "Priest", "Agitator", "Beggar", "Investigator", "Merchant",
        "Rat Catcher", "Townsman", "Watchman", "Duelist", "Servant", "Warden", "Bailiff", "Hedge Witch", "Miner",
        "Villager", "Coachman", "Flagellant", "Pedlar", "Road Warden", "Witch Hunter", "Boatman", "Huffer", "Riverwarden", "Riverwoman", "Seaman", "Smuggler",
        "Stevedore", "Bawd", "Charlatan", "Fence", "Grave Robber", "Racketeer", "Thief", "Witch", "Protagonist", "Slayer", "Warrior Priest"];

    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var s = Career.getRandomCareer(h.jobArray).name;
        if (ill.includes(s))
            console.log("Wood elf career: " + s + " shouldnt be generated");
    }
}

function testRandomCareer(max) {
    testRandomCareerHalfling(max);
    testRandomCareerHuman(max);
    testRandomCareerDwarf(max);
    testRandomCareerHighElf(max);
    testRandomCareerWoodElf(max);
}

function testRandomCharacter(max) {
    testRandomCharacterHuman(max);
    testRandomCharacterDwarf(max);
    testRandomCharacterHighElf(max);
    testRandomCharacterWoodElf(max);
    testRandomCharacterHalfling(max);
}

function testRandomCharacterDwarf(max) {
    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var char = Character.generateRandom(new Dwarf());
        var char2 = Character.generateFromString(char.toString());
        console.log("Created: " + char2.name + " the " + char2.species.name + " " + char2.currentCareer.name);
        if (!char.equals(char2)) {
            console.log("Failed to revert char from string");
        }
    }
}

function testRandomCharacterHighElf(max) {
    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var char = Character.generateRandom(new HighElf());
        var char2 = Character.generateFromString(char.toString());
        console.log("Created: " + char2.name + " the " + char2.species.name + " " + char2.currentCareer.name);
        if (!char.equals(char2)) {
            console.log("Failed to revert char from string");
        }
    }
}

function testRandomCharacterWoodElf(max) {
    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var char = Character.generateRandom(new WoodElf());
        var char2 = Character.generateFromString(char.toString());
        console.log("Created: " + char2.name + " the " + char2.species.name + " " + char2.currentCareer.name);
        if (!char.equals(char2)) {
            console.log("Failed to revert char from string");
        }
    }
}

function testRandomCharacterHalfling(max) {
    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var char = Character.generateRandom(new Halfling());
        var char2 = Character.generateFromString(char.toString());
        console.log("Created: " + char2.name + " the " + char2.species.name + " " + char2.currentCareer.name);
        if (!char.equals(char2)) {
            console.log("Failed to revert char from string");
        }
    }
}

function testRandomCharacterHuman(max) {
    var roll = rand(1, max);
    for (var i = 0; i < roll; i++) {
        var char = Character.generateRandom(new Human());
        var char2 = Character.generateFromString(char.toString());
        if (!char.equals(char2)) {
            console.log("Failed to revert char from string");
        }
    }
}
//#endregion

function main() {
    //testTalent();
    //testSkill();
    //testCareer();
    //testRandomCareer(10);

    //testRandomCharacter(50);

    var v = Skill.getFromDatabase("Lore (any)");
    var s = Array.from(v);

    s.splice(0, 1);

    console.log(v);
    console.log(s);

    //console.log(Character.generateRandom(new Human()));

    var char = Character.generateRandom(new Human());

    document.getElementById("test").innerHTML = Skill.basicSkillArrayToHtml(char);
    document.getElementById("test").innerHTML += Skill.advanceSkillArrayToHtml(char);
    document.getElementById("test").innerHTML += Talent.talentArrayToHtml(char);
}

function rand(lower, max) {
    return Math.floor(Math.random() * (max - lower)) + lower;
}

function rollDice(count, d) {
    var ret = 0;
    for (var i = 0; i < count; i++) {
        ret += rand(1, d + 1);
    }
    return ret;
}

main();


////////////////////////////////////////////////////////////////////////////////////
//Visual Code
////////////////////////////////////////////////////////////////////////////////////

function hoverStop() {
    var ob = document.getElementById("hover");
    ob.style.opacity = 0;
    ob.style.left = "0px";
    ob.style.top = "0px";
    ob.style.width = "0px";
    ob.style.height = "0px";
    ob.innerHTML = "";
}

function hoverStart(event, content) {

    var xpos = event.pageX - document.body.scrollLeft;
    var ypos = event.pageY - document.body.scrollTop;

    var ob = document.getElementById("hover");


    ob.style.width = "auto";
    ob.style.height = "auto";

    //ob.style.left = Math.min(xpos + 10, document.documentElement.clientWidth - ob.offsetWidth - 5) + "px";
    //ob.style.top = Math.min(ypos + 10, document.documentElement.clientHeight - ob.offsetHeight - 5) + "px";


    ob.innerHTML = content.replaceAll("$", "\"");

    setTimeout(function () {
        ob.style.opacity = 1;
        ob.style.left = Math.min(xpos + 10, document.documentElement.clientWidth - ob.offsetWidth - 5) + "px";
        ob.style.top = Math.min(ypos + 10, document.documentElement.clientHeight - ob.offsetHeight - 5) + "px";
    }, 1);
}