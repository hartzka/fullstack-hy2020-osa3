(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),u=t.n(c),o=(t(19),t(2)),l=function(e){return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:e.nameFilter,onChange:e.handle}))},i=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},s=function(e){return r.a.createElement("li",null,e.person.name," ",e.person.number,r.a.createElement("button",{onClick:function(){return e.handleDeleteClick(e.person)}},"delete"))},m=function(e){return r.a.createElement("ul",null,e.persons.map((function(n){return r.a.createElement(s,{key:n.id,person:n,handleDeleteClick:e.handleDeleteClick})})))},d=t(3),f=t.n(d),h="/api/persons",p=function(){return f.a.get(h).then((function(e){return e.data}))},b=function(e){return e.id=Math.floor(1e6*Math.random())+1,f.a.post(h,e).then((function(e){return e.data}))},v=function(e,n){return f.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return f.a.delete("".concat(h,"/").concat(e))},g=function(e){var n=e.message;return null===n?null:"success"===n.type?r.a.createElement("div",{className:"message success"},n.text):"error"===n.type?r.a.createElement("div",{className:"message error"},n.text):null},w=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],u=Object(a.useState)(""),s=Object(o.a)(u,2),d=s[0],f=s[1],h=Object(a.useState)(""),w=Object(o.a)(h,2),C=w[0],y=w[1],N=Object(a.useState)(""),j=Object(o.a)(N,2),O=j[0],x=j[1],k=Object(a.useState)(null),D=Object(o.a)(k,2),L=D[0],S=D[1];Object(a.useEffect)((function(){p().then((function(e){c(e)}))}),[]);var T=function(){var e=t.find((function(e){return e.name.toLowerCase()===d.toLowerCase()}));e.number=C,v(e.id,e).then((function(n){c(t.map((function(t){return t.id!==e.id?t:n})))})).then((function(n){var t={type:"success",text:"Updated the number of ".concat(e.name)};S(t),setTimeout((function(){S(null)}),4e3)})).catch((function(n){var t={type:"error",text:"".concat(e.name," has already been removed from the server!")};S(t),setTimeout((function(){S(null)}),4e3)})),f(""),y("")},P=function(e){E(e.id).then((function(n){var a=t.filter((function(n){return n.id!==e.id}));c(a)})).then((function(n){var t={type:"success",text:"Deleted ".concat(e.name)};S(t),setTimeout((function(){S(null)}),4e3)})).catch((function(n){var t={type:"error",text:"".concat(e.name," has already been removed from the server!")};S(t),setTimeout((function(){S(null)}),4e3)}))},F=t.filter((function(e){return console.log("pe",e),e.name.toLowerCase().includes(O.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h1",null,"Phonebook"),r.a.createElement(g,{message:L}),r.a.createElement(l,{nameFilter:O,handle:function(e){x(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(i,{newName:d,newNumber:C,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){y(e.target.value)},addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name.toLowerCase()===d.toLowerCase()})))if(window.confirm("".concat(d," is already added, replace the number?")))T();else{S({type:"message",text:"No change"}),setTimeout((function(){S(null)}),4e3)}else{var n={name:d,number:C},a=!0;b(n).then((function(e){c(t.concat(e))})).catch((function(e){a=!1,console.log(e.response.data)}));var r={type:"success",text:"".concat(n.name," has been added")};a||(r.type="error",r.text="Person validation failed. Name min length 3, number min length 8."),S(r),setTimeout((function(){S(null)}),4e3),f(""),y(""),x("")}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{persons:F,handleDeleteClick:function(e){console.log("deleting",e.id);var n=e.name;window.confirm("Delete ".concat(n,"?"))&&P(e)}}))};u.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.5fd57fe2.chunk.js.map