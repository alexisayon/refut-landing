export var PlayerPosition;
(function (PlayerPosition) {
    PlayerPosition["GOALKEEPER"] = "goalkeeper";
    PlayerPosition["DEFENDER"] = "defender";
    PlayerPosition["MIDFIELDER"] = "midfielder";
    PlayerPosition["FORWARD"] = "forward";
})(PlayerPosition || (PlayerPosition = {}));
export var SkillLevel;
(function (SkillLevel) {
    SkillLevel["BEGINNER"] = "beginner";
    SkillLevel["INTERMEDIATE"] = "intermediate";
    SkillLevel["ADVANCED"] = "advanced";
    SkillLevel["PROFESSIONAL"] = "professional";
})(SkillLevel || (SkillLevel = {}));
export var MatchStatus;
(function (MatchStatus) {
    MatchStatus["SCHEDULED"] = "scheduled";
    MatchStatus["IN_PROGRESS"] = "in_progress";
    MatchStatus["FINISHED"] = "finished";
    MatchStatus["CANCELLED"] = "cancelled";
})(MatchStatus || (MatchStatus = {}));
export var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["EASY"] = "easy";
    DifficultyLevel["MEDIUM"] = "medium";
    DifficultyLevel["HARD"] = "hard";
})(DifficultyLevel || (DifficultyLevel = {}));
export var TrainingCategory;
(function (TrainingCategory) {
    TrainingCategory["TECHNICAL"] = "technical";
    TrainingCategory["TACTICAL"] = "tactical";
    TrainingCategory["PHYSICAL"] = "physical";
    TrainingCategory["MENTAL"] = "mental";
})(TrainingCategory || (TrainingCategory = {}));
export var StatsPeriod;
(function (StatsPeriod) {
    StatsPeriod["WEEK"] = "week";
    StatsPeriod["MONTH"] = "month";
    StatsPeriod["SEASON"] = "season";
    StatsPeriod["ALL_TIME"] = "all_time";
})(StatsPeriod || (StatsPeriod = {}));
