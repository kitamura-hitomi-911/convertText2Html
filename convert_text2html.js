/**
 * 独自タグ設定
 */
const split_delim = '|';
const custom_tags = [
    {
        custom:['※※※','※※※'],
        negative_character:'※',
        output:'<p class="alert">%value0%</p>',
    },
    {
        custom:['===','==='],
        negative_character:'=',
        output:'<h2>%value0%</h2>'
    },
    {
        custom:['[[>',']]'],
        output:'<a href="%value0%" target="_blank">%value1%</a>'
    },
    {
        custom:['[[',']]'],
        negative_character:'[',
        output:'<a href="%value0%">%value1%</a>'
    }
];

/**
 * ユーザー入力を正規表現内の文字列リテラルとして扱う
 * @param {string} string
 * @returns {string}
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&'); // $&はマッチした部分文字列全体を意味します
}

/**
 * 改行コードを<br>に変換して返す
 * @param {String} txt
 * @returns {String}
 */
function nl2br(txt = ''){
    return txt.replace(/\r\n/g, '<br>').replace(/(\n|\r)/g, '<br>');
}

/**
 * カスタムタグをHTMLタグに変換して返す
 * @param {String} txt
 * @returns {string}
 */
function custom2html(txt = ''){
    custom_tags.forEach((setting)=>{
        let regex = new RegExp(escapeRegExp(setting.custom[0])+'(' + (setting.negative_character?'[^'+setting.negative_character+']':'.')+'+?)'+escapeRegExp(setting.custom[1]), '');
        txt = txt.replace(regex,(whole, values) => {
            const value_ary = values.split(split_delim);
            return setting.output.replace(/%value([0-9])%/g,(replace_whole, value_num) =>{
                return value_ary[value_num] || value_ary[0];
            });
        });
        console.log(txt);
    });
    return txt;
}

export default function(txt){
    let src = txt;
    src = nl2br(src);
    src = custom2html(src);
    return src;
};