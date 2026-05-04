// @color=#00852B icon="\uf11b" block="קודים מורכבים"
namespace CustomSequences {
    let currentInput = ""
    const MAX_LEN = 10

    /**
     * מפעיל קוד כאשר רצף לחיצות מסוים מוזן (למשל ABBA)
     */
    //% block="כאשר נלחץ הקוד %code"
    //% code.defl="ABBB"
    export function onCodeEntered(code: string, handler: () => void) {
        // רישום האירוע לפי מזהה שנוצר מהטקסט של הקוד
        control.onEvent(200, getStringHash(code), handler)
    }

    function checkPress(button: string) {
        currentInput += button

        // הגבלת אורך ההיסטוריה כדי לשמור על זיכרון
        if (currentInput.length > MAX_LEN) {
            currentInput = currentInput.substr(currentInput.length - MAX_LEN)
        }

        // בדיקה האם הסיומת של מה שהוקלד תואמת לאחד הקודים שהוגדרו בבלוקים
        for (let i = 1; i <= currentInput.length; i++) {
            let sub = currentInput.substr(currentInput.length - i)
            let hash = getStringHash(sub)
            control.raiseEvent(200, hash)
        }
    }

    // פונקציה פשוטה להפיכת טקסט למספר מזהה
    function getStringHash(s: string): number {
        let h = 0
        for (let i = 0; i < s.length; i++) {
            h = (h * 31 + s.charCodeAt(i)) | 0
        }
        return Math.abs(h % 10000)
    }

    input.onButtonPressed(Button.A, () => checkPress("A"))
    input.onButtonPressed(Button.B, () => checkPress("B"))
}
