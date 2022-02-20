//=============================================================================
// RPG Maker MZ - Vehicle on off
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc 11のスイッチオンのとき乗り物のれない＆そのときスイッチ１２オン
 * @author fuobaa
 *
 * @help VehicleSwitch.js
 *
 * 必要に応じてソースコード上のスイッチ 11 12を別のスイッチに直接書き換えて下さい
 *
 * Copyright (c) 2022 fuobaa
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 */



(() => {

var f_Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
if ($gameSwitches.value(11)){
 $gameSwitches.setValue(12,true);
 return false;
}
return f_Game_Player_getOnVehicle.call(this);
};



})();
