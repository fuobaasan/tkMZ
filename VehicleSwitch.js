//=============================================================================
// RPG Maker MZ - Vehicle on off
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc 11のスイッチオンのとき乗り物のれない＆そのときスイッチ１２オン rev02
 * @author fuobaa
 *
 * @help VehicleSwitch.js
 *
 * 必要に応じてソースコード上のスイッチ 11 12を別のスイッチに直接書き換えて下さい
 * ( $gameSwitches.value(11) と $gameSwitches.setValue(12,true) の所)
 * Copyright (c) 2022 fuobaa
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 */



(() => {

var f_Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
    const direction = this.direction();
    const x1 = this.x;
    const y1 = this.y;
    const x2 = $gameMap.roundXWithDirection(x1, direction);
    const y2 = $gameMap.roundYWithDirection(y1, direction);
if ($gameSwitches.value(11)){
    if ($gameMap.airship().pos(x1, y1)) {
 $gameSwitches.setValue(12,true);
    } else if ($gameMap.ship().pos(x2, y2)) {
 $gameSwitches.setValue(12,true);
    } else if ($gameMap.boat().pos(x2, y2)) {
 $gameSwitches.setValue(12,true);
    }
 return false;
}
return f_Game_Player_getOnVehicle.call(this);
};



})();
