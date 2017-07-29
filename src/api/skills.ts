export class Skills {
  music: boolean = false;
  dance: boolean = false;
  acting: boolean = false;
  drawing: boolean = false;
  literature: boolean = false;
  athletics: boolean = false;
  games: boolean = false;
  endurance: boolean = false;
  coordination: boolean = false;
  designing: boolean = false;
  programming: boolean = false;
  data_analysis: boolean = false;
  technical_writing: boolean = false;
}

export function renderSkills(skills: Skills): string[] {
  var skillsArr: string[] = [];
  for(let skill in skills) {
    if(skills[skill]) skillsArr.push(skill);
  }
  return skillsArr;
}
