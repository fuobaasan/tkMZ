//=============================================================================
// RPG Maker MZ - Delete state over time
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc タイムプログレス戦闘用 ステートの解除条件として時間を設定する v1.00
 * @author fuobaa
 *
 * @help DelStateTime.js
 *
 * PluginCommonBase.js の導入を前提としています。
 * PluginCommonBase.js より下に配置して下さい。
 * 
 * タイムプログレス戦闘にて、各ステートの解除条件として、経過時間を
 * 設定できるようになります。
 * 
 * 条件を設定したいステートのメモ欄に、下記のように入れて下さい。
 * <time:100>
 * 多分これで 100 フレームでステート解除になります。
 * 
 * Copyright (c) 2022 fuobaa
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 */



(() => {

    /* 新たに時間用パラメータを設定 */
    const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.call(this);
    this._stateTimes = {};
};

    /* 時間の初期値を設定。時間指定ない場合は負の値 */
    const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    var stTime = PluginManagerEx.findMetaValue($dataStates[stateId], "time");
    if (stTime === void 0) {
        stTime = -100;
    }
    this._stateTimes[stateId] = stTime;

    _Game_BattlerBase_resetStateCounts.call(this,stateId);
};



    /* バトラーが生きていたら時間減らす関数を呼ぶ */
const _Game_Battler_updateTpb = Game_Battler.prototype.updateTpb;
Game_Battler.prototype.updateTpb = function() {

    if (this.isAlive()) {
        this.updateStateTime();
    }
    _Game_Battler_updateTpb.call(this);
};


    /* 時間を減らし、０になったら解除させる */
Game_Battler.prototype.updateStateTime = function() {

    for (const stateId of this._states) {

        if (this._stateTimes[stateId] > 0) {
            this._stateTimes[stateId]--;

        }
        if (this._stateTimes[stateId] == 0) {
            this.removeState(stateId);

        }
    }
}


})();
