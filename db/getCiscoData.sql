select calltype, calldate, calllength, emname, a.emid from cisco a left join employee b on a.emid = b.emid where a.emid = $1