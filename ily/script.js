$(()=>{

    const memes = ['https://i.imgur.com/Eew6Sx9.jpg','https://i.imgur.com/mQi2ybN.jpg','https://i.imgur.com/kPILHZo.jpg','https://i.imgur.com/uDRJst0.jpg','https://i.imgur.com/gN0rK1u.jpg','https://i.imgur.com/qqEq1yM.jpg','https://i.imgur.com/UZ1SwGo.jpg','https://i.imgur.com/WFtBkZF.jpg','https://i.imgur.com/vkXQ0Sj.jpg','https://i.imgur.com/gRSySgC.jpg','https://i.imgur.com/dXiPZsr.jpg','https://i.imgur.com/5zw7HCM.jpg','https://i.imgur.com/iHBrHhm.jpg','https://i.imgur.com/B2YvUgZ.jpg','https://i.imgur.com/2JSpntv.jpg','https://i.imgur.com/SvfXBdt.jpg','https://i.imgur.com/MSY2LU3.jpg','https://i.imgur.com/vYeIRnR.jpg','https://i.imgur.com/7oinUuW.jpg','https://i.imgur.com/772bzYy.jpg','https://i.imgur.com/r96p583.jpg','https://i.imgur.com/7sCAOCh.jpg','https://i.imgur.com/r6DXsq7.jpg','https://i.imgur.com/zg8XbnJ.jpg','https://i.imgur.com/Z8wxcpn.jpg','https://i.imgur.com/2ptlFoo.jpg','https://i.imgur.com/CD3iEbk.jpg','https://i.imgur.com/HhB8oJF.jpg','https://i.imgur.com/kKl76Qg.jpg','https://i.imgur.com/ur2CCxn.jpg','https://i.imgur.com/2ZKFybD.jpg','https://i.imgur.com/6Y2VRzV.jpg','https://i.imgur.com/6lzZlUW.jpg','https://i.imgur.com/H34G2qC.jpg','https://i.imgur.com/nrTBR2T.jpg','https://i.imgur.com/AHqDcnI.jpg','https://i.imgur.com/XVxNc9A.jpg','https://i.imgur.com/ufaFEtv.jpg','https://i.imgur.com/lN4VnW9.jpg','https://i.imgur.com/pBRUmpW.jpg','https://i.imgur.com/uuRBmXA.jpg','https://i.imgur.com/iiShuyH.jpg','https://i.imgur.com/7ukJ7Nz.jpg','https://i.imgur.com/KH3y8DZ.jpg','https://i.imgur.com/xlDEWI2.jpg','https://i.imgur.com/3OTdJC5.jpg','https://i.imgur.com/NnI07L3.jpg','https://i.imgur.com/DvfH1So.jpg','https://i.imgur.com/lW5BPnE.jpg','https://i.imgur.com/WQvQ8qy.jpg','https://i.imgur.com/yTdrgYd.jpg','https://i.imgur.com/oiQqy4T.jpg','https://i.imgur.com/KPfyX08.jpg','https://i.imgur.com/FpFdns8.jpg','https://i.imgur.com/36bmrCa.jpg','https://i.imgur.com/syGXDBO.jpg','https://i.imgur.com/RY2MXh3.jpg','https://i.imgur.com/8d0znur.jpg','https://i.imgur.com/a7EWgTT.jpg','https://i.imgur.com/KVHsE2Q.jpg','https://i.imgur.com/7Ar18k9.jpg','https://i.imgur.com/qZQceHa.jpg','https://i.imgur.com/m4uplkL.jpg','https://i.imgur.com/uslVulk.jpg','https://i.imgur.com/0MzCBYR.jpg','https://i.imgur.com/cjcDhX6.jpg','https://i.imgur.com/1q3f3sG.jpg','https://i.imgur.com/D8xXe9u.jpg','https://i.imgur.com/DpOEfjP.jpg','https://i.imgur.com/1hLSD6i.jpg','https://i.imgur.com/St0k0at.jpg','https://i.imgur.com/OuCHSnt.jpg','https://i.imgur.com/B9H7D7Q.jpg','https://i.imgur.com/fNYnppA.jpg','https://i.imgur.com/9kXZq7u.jpg','https://i.imgur.com/PQtbjWH.jpg','https://i.imgur.com/15bVleI.jpg','https://i.imgur.com/ZJYSrK6.jpg','https://i.imgur.com/ItdInQX.jpg','https://i.imgur.com/4I6GY4m.jpg','https://i.imgur.com/8E1sFr5.jpg','https://i.imgur.com/pKHzn7J.jpg','https://i.imgur.com/1LkFVwc.jpg','https://i.imgur.com/gHcqSnQ.jpg','https://i.imgur.com/rpy9JXk.jpg','https://i.imgur.com/bEq8hOo.jpg','https://i.imgur.com/5TXhNYd.jpg','https://i.imgur.com/3eDQa0h.jpg','https://i.imgur.com/KdGOLal.jpg','https://i.imgur.com/5LxkiIs.jpg','https://i.imgur.com/XENDGJf.jpg','https://i.imgur.com/XjXXqtZ.jpg','https://i.imgur.com/jc7Moae.jpg','https://i.imgur.com/nil77lh.jpg','https://i.imgur.com/V3ZdLNY.jpg','https://i.imgur.com/K1IJ6JS.jpg','https://i.imgur.com/5Pf8A5X.jpg','https://i.imgur.com/fwCcvKh.jpg','https://i.imgur.com/g04nk97.jpg','https://i.imgur.com/bKAfHXU.jpg'];
    
    var meme = memes[Math.floor(Math.random()*memes.length)];

    var preload = new Image();
    preload.src = meme;
    preload.onload = ()=>{
        $('body').append(`<img src="${meme}">`);
        $('img').primaryColor(c=>$('body').css('background-color',`rgb(${c})`));
    }
    preload.onerror = ()=>location.reload();

});