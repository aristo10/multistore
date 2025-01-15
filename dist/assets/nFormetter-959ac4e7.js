const e=["","k","M","B","T"];function i(t){const o=Math.floor(Math.log10(Math.abs(t))/3);if(o===0)return t.toFixed(0);const a=e[o],s=Math.pow(10,o*3);return`${(t/s).toFixed(1)}${a}`}export{i as a};
