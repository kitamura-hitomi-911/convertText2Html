/**
 * 独自タグ設定
 */
const split_delim = '|';
const custom_tags = [
    {
        custom:['※※※','※※※'],
        output:'<p class="alert">%value0%</p>',
        html:['<p class="alert">','</p>']
    },
    {
        custom:['[[',']]'],
        output:'<a href="%value0%">%value1%</a>'
    },
];

/**
 * 改行コードを<br>に変換して返す
 * @param {String|Number} txt
 * @returns {String}
 */
function nl2br(txt = ''){
    return txt.replace(/\r\n/g, '<br>').replace(/(\n|\r)/g, '<br>');
}

function custom2html(txt = ''){
    custom_tags.forEach((setting)=>{
        const regex = new RegExp(setting.custom[0]+'(.*?)'+setting.custom[1], 'i');
        console.log(txt.match(regex));
        txt = txt.replace(regex,(whole, values) => {
            const value_ary = values.split(split_delim);
            console.log(setting.output.match(/%value[0-9]%/));
            setting.output.replace(/%value([0-9])%/,(...replace_tgts) =>{
                console.log(replace_tgts);
            });

            return setting.html[0] + values + setting.html[1];
        });
    });
    return txt;
}

export default function(txt){
    let src = txt;
    src = nl2br(src);
    src = custom2html(src);
    return src;
};