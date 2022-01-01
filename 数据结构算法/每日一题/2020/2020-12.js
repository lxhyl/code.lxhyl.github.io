// #860 
{
  const lemonadeChange = bills => {
    const len = bills.length;
    if (len === 0) return true;
    if (len[0] >= 10) return false;
    const map = {
      '5': 0,
      '10': 0,
    };
    for (let index = 0; index < len; index++) {
      const bill = bills[index];
      switch (true) {
        case bill === 5:
          map['5'] += 1;
          break;
        case bill === 10:
          if (map['5'] > 0) {
            map['5'] -= 1;
            map['10'] += 1;
          } else {
            return false;
          }
          break;
        case bill === 20:
          if (map['10'] > 0) {
            if (map['5'] > 0) {
              map['10'] -= 1;
              map['5'] -= 1;
            } else {
              return false;
            }
          } else {
            if (map['5'] >= 3) {
              map['5'] -= 3;
            } else {
              return false;
            }
          }

      }
    }
    return true;
  }
  const test = [5, 5, 5, 10, 20];
  console.log(lemonadeChange(test))

}