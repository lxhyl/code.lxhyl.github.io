{
    // #349
    const intersection = (nums1, nums2) => {
        return Array.from(new Set(nums2.filter(item => new Set(nums1).has(item))))
    }

    let nums1 = [1, 2, 2, 1], nums2 = [2, 2]
    console.log(intersection(nums1, nums2))

}

{
    // #941
    // 双指针法
    const validMountainArray = a => {
        let len = a.length;
        if (len < 3) {
            return false
        }
        let left = 0, right = len - 1;
        while (a[left + 1] > a[left]) {
            left++;
        }
        while (a[right - 1] > a[right]) {
            right--;
        }
        return left > 0 && right < len - 1 && left == right
    }

    const testArr = [3, 6, 5, 5]
    console.log(validMountainArray(testArr))
}


{
    // #1356
    const sortByBits = arr => arr.sort((a, b) => {
        let have1num = num => {
            return num.toString(2).replace(/[^1]/g, '').length
        }
        if (have1num(a) < have1num(b)) {
            return -1
        }
        if (have1num(a) == have1num(b)) {
            return a - b
        }
        return 1
    })
}


{
    // #884
    const solution = (A, B) => {
        const str2Arr = s => s.split(' ')

        const getWordsNum = (arr, map = {}) => {
            arr.forEach(item => {
                map[item] = map[item] || 0;
                map[item]++;
            });
            return map
        }

        let all = getWordsNum([...str2Arr(A), ...str2Arr(B)])
        let result = [];
        for (let i in all) {
            if (all[i] === 1) {
                result.push(i)
            }
        }
        return result
    }
    let A = "apple apple", B = "banana"
    console.log(solution(A, B))
}


{
    // #205
    const isIsomorphic = (s, t) => {
        for (let i = 0; i < s.length; i++) {
            if (s.indexOf(s[i]) != t.indexOf(t[i])) {
                return false
            }
        }
        return true
    }

    let s = "paper", t = "title"
    console.log(isIsomorphic(s, t))
}


{
    // #17
    const solution = digits => {
        if (!digits) return []
        const map = {
            2: 'abc',
            3: 'def',
            4: 'ghi',
            5: 'jkl',
            6: 'mno',
            7: 'pqrs',
            8: 'tuv',
            9: 'wxyz'
        }
        let result = [];
        const dfs = (index, strArr) => {
            if (index == digits.length) {
                result.push(strArr.join(''));
                return
            }
            let mapStr = map[digits[index]]
            for (let i = 0; i < mapStr.length; i++) {
                strArr.push(mapStr[i]);
                dfs(index + 1, strArr);
                strArr.pop()
            }
        }
        dfs(0, [])
        return result;
    }
    console.log(solution('23'))
    /*
    *  [
    *   'ad', 'ae', 'af',
    *   'bd', 'be', 'bf',
    *   'cd', 'ce', 'cf'
    *  ]
    */
}


{
    // #922
    const sortArrayByParity = A => {
        let i = 0, j = 1;
        for (i; i < A.length; i += 2) {
            while (A[i] % 2 != 0) {
                [A[i], A[j]] = [A[j], A[i]]
                j += 2
            }
        }
        return A
    }
    const arr = [4, 2, 5, 7];
    console.log(sortArrayByParity(arr))
}


{
    // #35
    const searchIndex = (nums, target) => {
        let i = 0;
        while (nums[i] < target) {
            i++;
        }
        return i;
    }
    const nums = [1, 3, 5, 6], target = 0;
    console.log(searchIndex(nums, target))
}


{
    // #589
    const preorder = root => {
        let result = []
        const dfs = (node) => {
            if (!node) return;
            result.push(node.val)
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    dfs(node.children[i]);
                }
            }
        }
        dfs(root)
        return result;
    }

}



{
    // #289
    const gameOfLife = board => {
        let needChange = [];
        const isExist = (i, j) => {
            return board[i] && board[i][j] ? true : false;
        }
        const compute = (num) => ({
            map: function (i, j) {
                if (isExist(i, j) && board[i][j]) {
                    num++;
                }
                return compute(num)
            },
            of: () => num
        })
        const compose = (i, j) => {
            const helpArr = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ]
            let f = compute(0);
            while (helpArr.length > 0) {
                f = f.map(i + helpArr[0][0], j + helpArr[0][1]);
                helpArr.shift();
            }
            return f.of()
        }

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let num = compose(i, j)
                if ((board[i][j] && (num < 2 || num > 3)) || (!board[i][j] && num === 3)) {
                    needChange.push([i, j])
                }
            }
        }
        let dieLiveMap = {
            0: 1,
            1: 0
        }
        needChange.forEach(item => {
            let val = board[item[0]][item[1]]
            board[item[0]][item[1]] = dieLiveMap[val]
        })
        return board;

    }
    const testArr = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ]
    console.log(gameOfLife(testArr));
}


{
    // #231
    const isPowerOfTwo = n => {
        return n > 0 && ((n & (n - 1)) === 0)
    }
    console.log(isPowerOfTwo(16))
}


{
    // #1013
    const canThreePartsEqualSum = A => {
        let sumA = A.reduce((sum, item) => sum + item, 0);
        if (sumA % 3 != 0) return;
        let sum = 0;
        let index = 0;
        for (let i = 0; i < A.length; i++) {
            sum += A[i]
            if (sum == sumA / 3) {
                sum = 0;
                index++;
            }
        }
        return index > 2

    }
    let testArr = [10, -10, 10, -10, 10, -10, 10, -10]
    console.log(canThreePartsEqualSum(testArr))
}


{
    // # 1295
    const findNumbers = nums => {
        let result = 0;
        nums.forEach(item => {
            if (item.toString().length % 2 == 0) {
                result++;
            }
        })
        return result
    }
    let nums = [12, 345, 2, 6, 7896]
    console.log(findNumbers(nums))
}


{
    // #551
    const checkRecord = s => {
        let i = 0;
        let Anum = 0;
        while (i < s.length) {
            if (s[i] == 'A') {
                Anum++;
            }
            if (Anum > 1) {
                return false
            }
            if (s[i] == 'L' && s[i + 1] && s[i + 1] == 'L' && s[i + 2] && s[i + 2] == 'L') {
                return false;
            }
            i++;
        }
        return true;
    }
    let str = "PPALLL";
    console.log(checkRecord(str))
}

{
    const slowestKey = (releaseTimes, keysPressed) => {
        let map = {};
        map[keysPressed[0]] = releaseTimes[0];
        for (let i = 1; i < releaseTimes.length; i++) {
            let timeGap = releaseTimes[i] - releaseTimes[i - 1];
            map[keysPressed[i]] = (map[keysPressed[i]] || 0) + timeGap;
        }
        // 找到最大的key
        let maxNum = 0;
        let maxkey = null;
        for (let key in map) {
            if (map[key] > maxNum) {
                maxNum = map[key]
                maxkey = key;
            }
        }

        // 找到此值的所有key
        let keys = [];
        for (let key in map) {
            if (map[key] == maxNum) {
                keys.push(key)
            }
        }
        keys.sort()
        console.log('map', map)
        console.log('maxNum', maxNum)
        console.log('keys', keys)
        return keys[keys.length - 1];
    }
    let releaseTimes = [372943, 3955002, 3966366, 4482897, 5469362, 5592545, 5665997, 5986506, 6442701, 6751933, 9008337, 9346551, 11696513, 13262545, 14316629, 17093321, 18511723, 20480038, 20843442, 22169660, 23555585, 24124001, 25263462, 26922369, 28386944, 29661750, 31359520, 32018294, 33704230, 34188085, 34420228, 35223356, 35322920, 35577946, 36955757, 39070707, 41119391, 42426181, 42656111, 44007634, 44878119, 45587657, 45764928, 46898868, 47447978, 49137400, 49375220, 49838194, 49974152, 50370133, 50384020, 50686959, 52795300, 55466951, 56866859, 57242521, 58211199, 60947408, 61133320, 61531449, 64380227, 65666017, 66025072, 66382871, 67302587, 68113496, 69266413, 69457259, 69515537, 69566327, 70036267, 71871614, 74479627, 74602314, 74865554, 75512169, 78270063, 82281228, 82682023, 83463760, 84094966, 84774083, 86099828, 86100975, 86279067, 88949265, 90752490, 90762356, 90871218, 91985983, 92607168, 94042724, 94945398, 95245464, 95390672, 95916559, 96524336, 100895088, 103413076, 103813474, 105824469, 108786686, 109688561, 110215602, 110808648, 112570998, 112658976, 117195589, 117231224, 117498810, 125095792, 128657392, 132161383, 132662707, 133016519, 133556403, 135121337, 135458691, 136913448, 138876931, 140421866, 141643405, 141752926, 142448335, 143860306, 143951255, 144775272, 146226360, 147355951, 148557703, 150732364, 150736523, 151255219, 153308145, 153548971, 155092890, 155695032, 157535993, 158234401, 158508555, 158686045, 158758341, 159762468, 160530788, 161475254, 162246928, 162413692, 164240911, 164599799, 164745328, 165011801, 166870407, 169419488, 171375769, 171766973, 172545411, 172783434, 173970843, 173976111, 176337990, 178300555, 179299106, 181599445, 182838684, 185456124, 185735703, 187729482, 188541111, 188912962, 189855067, 190480038, 193376196, 193919918, 195538861, 196268610, 196394836, 196432980, 197721040, 201233729, 202012322, 202590711, 202791423, 202917285, 203360499, 203973219, 204641242, 206064622, 206493806, 207597207, 208806719, 213317717, 213999603, 216176842, 216659522, 216777455, 216786386, 217235383, 217913623, 220960647, 224852114, 225181421, 227539179, 229065644, 230053700, 231330770, 231423035, 232940560, 235387288, 235526524, 235807579, 236141306, 236264863, 237069752, 237953962, 238750411, 238925768, 243816803, 244946757, 247106054, 247459705, 247929469, 249536538, 250253715, 250879070, 252003396, 252301853, 255065038, 257110655, 259308861, 259468951, 259558872, 260291667, 260704351, 261106615, 261253895, 261406673, 261642491, 261845194, 266119297, 266200993, 268210009, 272692424, 272887557, 274033815, 274167380, 276079491, 276714013, 277985332, 278533281, 278919368, 278945955, 279017378, 280267946, 280618841, 281217588, 282506464, 283948220, 285542963, 285990990, 285993404, 287004999, 291443103, 292528423, 292886431, 293863252, 294098782, 297749840, 297813735, 298634256, 300086531, 300337714, 302780904, 305672799, 305754611, 306866007, 307611684, 308882848, 309437645, 311023011, 311561572, 313723789, 313826099, 315256879, 315356464, 315810564, 318695009, 320269397, 320471247, 321626797, 321692779, 324365407, 327128678, 330994050, 332962583, 334743295, 335024532, 337677068, 338029868, 339082125, 340799365, 342152105, 342493106, 342865610, 342993304, 343354742, 346059486, 346472745, 347031747, 347703375, 348719183, 349100341, 349629588, 350438043, 351682711, 353340946, 353688460, 353731270, 355439839, 357042671, 358842627, 363244267, 364852329, 368553639, 369117238, 370469747, 370531904, 370985655, 371111022, 372445188, 372636280, 373050018, 374281887, 374542898, 374838167, 376510043, 378079136, 378260637, 380202735, 380304438, 380579140, 384945060, 385641363, 386430034, 386545585, 387454459, 387907883, 389335958, 392078844, 392248611, 393532496, 393970597, 396607139, 398060096, 398753558, 398813048, 399022636, 400799280, 400847732, 401238730, 401834800, 402644576, 403549170, 404217951, 406208866, 408026677, 408428258, 408472887, 408546988, 411897282, 413131574, 414569047, 417404660, 417502207, 419016438, 420326360, 421314796, 423489690, 426589937, 428339432, 428757462, 429278818, 429852996, 430847759, 431623411, 432542024, 434333544, 434608884, 435175309, 436417443, 437418510, 437741290, 438493121, 441722555, 443286775, 444131200, 444377657, 445251582, 445350989, 446640032, 449237517, 450422321, 450621342, 451650983, 451670662, 452346318, 453347077, 453783515, 453853543, 454724295, 456067292, 461297705, 465768814, 466564624, 467185661, 467244673, 469636054, 470105299, 470288755, 471395370, 471456552, 471925563, 472352163, 472756463, 472799927, 477869549, 478837128, 479493989, 479963558, 480210642, 480681689, 480776770, 481027688, 481054394, 484170945, 484335907, 485226351, 485668346, 486399671, 487643399, 495871277, 496238345, 500831844, 500859337, 501046264, 503769731, 505699169, 508993276, 509800732, 511390762, 513810575, 514457995, 514663837, 514675439, 515042971, 517108237, 517730977, 518191546, 519180615, 520313774, 521101393, 522662191, 522678362, 522947976, 525256179, 527363915, 528025645, 528995773, 530671900, 531499696, 531771596, 534332667, 534778963, 536480788, 537232226, 538647484, 544525200, 545137519, 545825551, 546568521, 546795737, 547497030, 548050074, 550701251, 551550100, 551644892, 552388547, 552794789, 554666472, 554709468, 555583699, 556401053, 558241448, 559020233, 561106792, 566842401, 569443166, 569467490, 569695743, 570027276, 570369187, 573920942, 573991243, 574306353, 575147057, 577013410, 577620114, 578536468, 583263054, 583530987, 585639861, 585940939, 586330346, 586775103, 590146907, 591598746, 592367259, 592811443, 594086867, 594732732, 594848717, 595917752, 596264596, 598408278, 598784059, 598916999, 599650245, 599719808, 600128990, 601834477, 603459392, 604042975, 605655101, 606271239, 610761849, 612491838, 612891638, 614136571, 614147433, 614870750, 615680668, 615897914, 616366632, 616416647, 620547146, 620662369, 621185034, 623259116, 623362333, 626065873, 627239019, 628763300, 629181962, 629525432, 629578214, 630125146, 630749956, 633739867, 634049981, 640023028, 640094596, 641964625, 644298057, 644974795, 646160193, 646571552, 646922033, 647032425, 648075936, 649884379, 649897167, 650735993, 651681505, 652032723, 652419231, 652519391, 655019216, 655637307, 656036529, 664446481, 665098061, 667625978, 667665041, 668552307, 669686444, 671553710, 672827218, 672947462, 673781741, 674409783, 675197849, 677941570, 678412223, 678508389, 679998318, 680164716, 680636710, 681530926, 682018974, 684488146, 685799320, 687321618, 688626324, 688789698, 690073301, 693549837, 697949957, 698940710, 699904867, 701242603, 701406856, 702327213, 702860573, 702979945, 703627005, 703974004, 704633274, 705308829, 708792155, 709768000, 709885853, 711651808, 712699380, 713883625, 715795069, 717919054, 719512551, 719845400, 719846545, 721223197, 722184823, 722485907, 722986020, 723538236, 725307510, 727170339, 727700748, 729631139, 730528788, 730587681, 731217074, 731990166, 732176738, 733111806, 733232684, 734373379, 735152127, 737368686, 737763395, 738271388, 738475745, 738788914, 739651460, 741280469, 741367854, 743052520, 743392802, 744174323, 744656343, 745463926, 746113397, 746897967, 747043856, 747231369, 747359619, 748103392, 748189848, 749348003, 751843130, 754004275, 755453276, 756537205, 757991903, 758096803, 758260067, 758296760, 758911481, 759315104, 759609818, 762454654, 763041078, 763049214, 763187625, 764730157, 766169692, 766875266, 767171820, 768339826, 769170950, 769570767, 771462758, 772414792, 773559574, 773646545, 774331986, 775545537, 776687729, 776767430, 776916574, 777241016, 777316883, 777521693, 779833108, 781233392, 782471557, 787371387, 788912902, 789324232, 790311285, 790529333, 790627901, 790713588, 791536071, 793238259, 794289127, 794592123, 795203995, 795431601, 796527120, 798343341, 798929978, 799055066, 800222387, 801045214, 803248048, 803512270, 803520773, 805218198, 805647234, 810575971, 811766393, 813419643, 814097441, 814190414, 814245301, 815090406, 815571786, 815749517, 820935023, 821726650, 821853647, 821985707, 823202881, 824162584, 824392620, 825276012, 827125285, 827476198, 829174774, 829553641, 830537253, 831755887, 832864062, 833360269, 833985161, 834514736, 834765352, 834967936, 835079248, 835819845, 836099355, 839637811, 840754258, 842882903, 845520025, 845970246, 847384457, 847673285, 848114860, 848188952, 850574796, 851172776, 851227137, 851653228, 853146749, 856191259, 857052010, 857927054, 858172550, 861515968, 861637673, 862260144, 863194641, 866381742, 868417518, 871455718, 874752932, 875014371, 875758118, 877094137, 878914268, 879824325, 881492167, 885167308, 885644075, 885756208, 886036826, 889105349, 890423746, 890464395, 890794846, 891213001, 891509597, 893125467, 893552499, 894532288, 894676103, 895095727, 895270606, 896159449, 898172708, 898449967, 899600778, 901154870, 903525388, 903806566, 904495587, 906724193, 907253734, 907473739, 907495205, 907546865, 909620982, 910819662, 911150279, 913802189, 914151334, 915363558, 915843681, 916355644, 918334129, 918414426, 921923156, 922012962, 923640079, 924012986, 924070603, 924470060, 925612393, 925996232, 926609019, 926804010, 927108035, 927227510, 927510989, 929756587, 930540829, 932118779, 932302014, 933786312, 934265299, 936066347, 936272937, 936556685, 937893576, 941613956, 941656019, 942542079, 943869935, 947056157, 949811919, 950015340, 950539295, 951380527, 951702172, 955815650, 956730609, 957163779, 959034073, 961573216, 962939541, 963485166, 963591327, 964293353, 965948357, 966938161, 968818288, 970472763, 973769604, 975046280, 977101316, 979034407, 980187078, 980359133, 980838578, 986756352, 989880662, 990624830, 991096780, 991889343, 992071073, 994942836, 995121378, 995818601, 995927038, 996166201, 997834654, 998212640, 998649302]
    let keysPressed = "opswcvuzsvzocinrzihzcfwomdgjsqnzjrbxkdwdjnomflzkbzcbyfipbtgumioioluyrhifyzpqoozuzqvaeodmtfyeokegyixhpbgnnntediluopjiccspjxggfpwpfaaussyyihsrxfzxrvcpvyelzzlidxoftrmjaeocyziaackeozjwpcztanpeiqpvpzerchqteautqpyebxcbpyfxptoocdubwgaghbnakybecvabhcrhjomfhunyuudqsfrvdfntoaptyjbpmxetiiwqdjkejunsnvyyvbwtgiquixwhpiagcakmthhjasmekyvozbcxurwoxlhdiqofdyauhhxayfpahxsjuklqcyeczmslwywmvxvdgjvqllipvggoramesoqmbiahulawmvabbbpezskksoftrlxzfehyxyjqtkkwtqeqnjysrvnfqykofkojubueybiyesholscrcvqnxtmxiiehlmcyzasksjpgeqdsmhjjffyvlslubbujouvoeqozttvvnsokrodrwlxyerzevqzemnxuvctuhoojcipnkvabkpbggcqezlnukdieoweptnwvedwzmrhjghaxqybnwaqdskjbzmhtkgzmrmlckerfhkrigdqksiewuzonrqoxsnwfbwkseaszislvmtllzhpqrkyarvuojeahulsxlsbqezkunpbempyvhukyppluhnpnwrhzgkxdrfqzhqemfaspfagjheqorzgpcgolpxnnfukgqfrddjalosakqzgigwalabrwvyvxvyjcefjspjxgwlrzqogotxiciabrnoniorvwjzntwxzxotnfgnpskqekhbgvalpivkbqpcimgqxliutaatpmaimuctubhaqwliwmigkseg"
    console.log(slowestKey(releaseTimes, keysPressed))
}


{
    // #1122
    const relativeSortArray = (arr1, arr2) => {
        let map = new Map()
        arr2.forEach(item => {
            map.set(item, []);
        });
        let surplus = [];
        arr1.forEach((item, index) => {
            if (map.has(item)) {
                let value = map.get(item);
                value.push(index);
                map.set(item, value)
            } else {
                surplus.push(item)
            }
        })
        surplus.sort((a, b) => a - b)
        let result = [];
        map.forEach((value, key) => {
            value = value.map(item => arr1[item]);
            result = [...result, ...value];
        })
        return [...result, ...surplus];
    }
    let arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], arr2 = [2, 1, 4, 3, 9, 6]
    console.log(relativeSortArray(arr1, arr2))
}


{
    // #47
    const permuteUnique = nums => {
        let len = nums.length;
        if (len === 0) {
            return []
        };
        let result = [];
        const dfs = (arr, indexs) => {
            if (arr.length == len) {
                let cloneArr = arr.map(item => item);
                result.push(cloneArr)
                return
            }
            for (let i = 0; i < len; i++) {
                if (indexs.indexOf(i) == -1) {
                    arr.push(nums[i]);
                    indexs.push(i)
                    dfs(arr, indexs)
                    arr.pop()
                    indexs.pop()
                }
            }
        }
        const unique = arr2 => {
            let res = {};
            arr2.forEach(item => {
                res[item] = item;
            })
            return Object.values(res);
        }
        dfs([], [])
        return unique(result);
    }
    let nums = [1];
    console.log(permuteUnique(nums))
}

{
    // #406
    const reconstructQueue = people => {
        people.sort((a, b) => {
            if (a[0] > b[0] || (a[0] == b[0] && a[1] < b[1])) {
                return -1;
            }
            return 1
        })
        let result = [];
        for (let i = 0; i < people.length; i++) {
            result.splice(people[i][1], 0, people[i])
        }
        return result
    }
    let people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]];
    console.log(reconstructQueue(people))
}
{
    // 406
    var reconstructQueue = function (people) {
        return people.sort((a, b) => b[0] - a[0] || a[1] - b[1]).reduce((p, v) => (p.splice(v[1], 0, v), p), [])
    };
    let people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]];
    console.log(reconstructQueue(people))
}


{
    // 1528
    const restoreString = (s, indices) => {
        let result = [];
        for (let i = 0; i < indices.length; i++) {
            result[indices[i]] = s[i]
        }
        return result.join('')
    }
    let s = "codeleet", indices = [4, 5, 6, 7, 0, 2, 1, 3];
    console.log(restoreString(s, indices));
}


{
    // 面试题 16.26.计算器
    const calculate = s => {
        s = s.replace(/\s/g, '').split('');
        s = s.reduce((arr, str) => {
            if (arr.length === 0) {
                arr.push(str)
                return arr;
            }
            let left = arr.pop()
            if (left && !isNaN(left) && !isNaN(str)) {
                arr.push(`${left}${str}`)
            } else {
                arr.push(left, str)
            }
            return arr;
        }, [])
        let priority = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2,
            '(': 0,
            ')': 0,
        }
        // s1：辅助栈, s2: 结果栈
        let s1 = [], s2 = [];
        const strHandle = index => {
            let char = s[index];
            if (!isNaN(+char)) {
                s2.push(char)
                return
            }
            if (s1.length === 0 || (s1[s1.length - 1] === '(')) {
                if (char === ')') {
                    s1.pop()
                } else {
                    s1.push(char)
                }
                return
            }

            if (char === '(') {
                s1.push(char)
                return
            }
            if (char === ')') {
                let s1TopStr = s1.pop();
                while (s1TopStr && s1TopStr !== '(') {
                    s2.push(s1TopStr);
                    s1TopStr = s1.pop();
                }
                return
            }

            // 处理运算符
            let topStr = s1[s1.length - 1];
            let flag = true
            while (flag) {
                if (topStr && priority[char] > priority[topStr]) {
                    s1.push(char)
                    flag = false
                }
                if (topStr && priority[char] <= priority[topStr]) {
                    s2.push(s1.pop())
                    topStr = s1[s1.length - 1];
                }
                if (s1.length === 0 || s1[s1.length - 1] === '(') {
                    s1.push(char)
                    flag = false
                }
            }
        }
        for (let i = 0; i < s.length; i++) {
            strHandle(i)
        }
        const suffix = s2.concat(s1.reverse())
        const compute = sfx => {
            let stack = [];
            for (let i in sfx) {
                let value = sfx[i]
                if (!isNaN(value)) {
                    stack.push(value)
                } else {
                    let x = +stack.pop(),
                        y = +stack.pop()
                    switch (true) {
                        case value === '+':
                            stack.push(y + x)
                            break
                        case value === '-':
                            stack.push(y - x)
                            break
                        case value === '*':
                            stack.push(y * x)
                            break
                        case value === '/':
                            stack.push(y / x)
                            break
                    }
                }
            }
            return stack.pop()
        }
        return compute(suffix)
    }
    let input = "3*2+100*(12+3)"
    console.log(calculate(input))
}



{
    // #1030
    const allCellsDistOrder = (R, C, r0, c0) => {
        let indexMap = new Map()
        for (let i = 0; i < C; i++) {
            for (let j = 0; j < R; j++) {
                let distance = Math.abs(i - c0) + Math.abs(j - r0);
                if (indexMap.has(distance)) {
                    let arr = indexMap.get(distance)
                    arr.push([j, i])
                    indexMap.set(distance, arr);
                } else {
                    indexMap.set(distance, [[j, i]])
                }
            }
        }
        indexMap = Array.from(indexMap).sort((a, b) => a[0] - b[0])
        return indexMap.reduce((s, i) => {
            s.push(...i[1])
            return s
        }, [])
    }
    let R = 1, C = 2, r0 = 0, c0 = 0
    console.log(allCellsDistOrder(R, C, r0, c0))
}


{
    // #1598
    const minOperations = logs => {
        return logs.reduce((s, i) => {
            switch (true) {
                case i === '../':
                    if (s >= 1) {
                        s--;
                    }
                    break;
                case i === './':
                    break;
                default:
                    s++;
            }
            return s
        }, 0)
    }
    let logs = ["d1/", "../", "../", "../"]
    console.log(minOperations(logs))
}

{
    // #829
    const consecutiveNumbersSum = N => {
        let result = 0,
            i = 1
        while (N > 0) {
            result = (N % i === 0) ? result + 1 : result;
            N -= i;
            i++
        }
        return result
    }
    console.log(consecutiveNumbersSum(100))
}

{
    // 1344
    const canCompleteCircuit = (gas, cost) => {
        const n = gas.length;
        let i = 0;
        while (i < n) {
            let sumOfGas = 0, sumOfCost = 0;
            let cnt = 0;
            while (cnt < n) {
                const j = (i + cnt) % n;
                sumOfGas += gas[j];
                sumOfCost += cost[j];
                if (sumOfCost > sumOfGas) {
                    break;
                }
                cnt++;
            }
            if (cnt === n) {
                return i;


            } else {
                i = i + cnt + 1;
            }
        }
        return -1;
    }
    const gas = [2, 3, 4],
        cost = [3, 4, 3]
    console.log(canCompleteCircuit(gas, cost))
}



{
    // #283
    const moveZeroes = nums => {
        let len = nums.length,
            left = 0,
            right = 0;
        while (right < len) {
            if (nums[right]) {
                [nums[left], nums[right]] = [nums[right], nums[left]]
                left++;
            }
            right++;
        }
        return nums;
    }
    const nums = [1, 0, 1]
    console.log(moveZeroes(nums))
}


{
    // #452
    const findMinArrowShots = points => {
        if (!points.length) return 0;
        points.sort((a, b) => a[1] - b[1]);
        let startR = points[0][1];
        return points.reduce((s, i) => {
            if (i[0] > startR) {
                startR = i[1];
                return s + 1;
            } else {
                return s
            }
        }, 1)
    }
    let test = [[10, 16], [2, 8], [1, 6], [7, 12]];
    console.log(findMinArrowShots(test))

}


{
    // #222
    const countNode = root => {
        let count = 0;
        const dfs = node => {
            if (!node) return;
            count++;
            dfs(node.left);
            dfs(node.right);
        }
        dfs(root);
        return count;
    }
}


