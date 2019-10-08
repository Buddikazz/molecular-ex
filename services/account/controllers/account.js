exports.transferCredit = (ctx) => {
    //TODO credit rollback process
    return ctx.call("account.get", {id: ctx.params.accountId ,fields: ["credit"]} ).then((result)=>{
        // return this.transformResult(result);
        var creditSMSReduce=0;
        var creditViberReduce=0;
        
        var creditChange=ctx.params.creditChange;
        var credit=result.credit;

        if(creditChange){
                if(creditChange.sms){
                    creditSMSReduce=parseInt(credit.sms.credit)-parseInt(creditChange.sms.creditAmount);
                }else{
                    creditSMSReduce=parseInt(credit.sms.credit)
                }
                if(creditChange.viber){
                    creditViberReduce=parseInt(credit.viber.credit)-parseInt(creditChange.viber.creditAmount);
                }else{
                    creditViberReduce=parseInt(credit.viber.credit)
                }
            return ctx.call("account.update", { _id: ctx.params.accountId, credit:
                {"sms": {"credit":creditSMSReduce,"cut_off_credit":creditChange.sms.cutOffCredit,"is_notified":0},"viber": {"credit":creditViberReduce,"cut_off_credit":creditChange.viber.cutOffCredit,"is_notified":0}}}).then(()=>{
                    return ctx.call("account.get", {id: ctx.params.creditedAcc ,fields: ["credit"]} ).then((resultTranfer)=>{
                        var creditSMSAdd=0;
                        var creditViberAdd=0;
                        var creditADD=resultTranfer.credit;
                        
                        if(creditChange.sms){
                            creditSMSAdd=parseInt(creditADD.sms.credit)+parseInt(creditChange.sms.creditAmount);
                        }else{
                            creditSMSAdd=parseInt(creditADD.sms.credit)
                        }
                        if(creditChange.viber){
                            creditViberAdd=parseInt(creditADD.viber.credit)+parseInt(creditChange.viber.creditAmount);
                        }else{
                            creditViberAdd=parseInt(creditADD.viber.credit)
                        
                        }

                        return ctx.call("account.update", { _id: ctx.params.creditedAcc, credit:
                            {"sms": {"credit":creditSMSAdd,"cut_off_credit":creditChange.sms.cutOffCredit,"is_notified":0},"viber": {"credit":creditViberAdd,"cut_off_credit":creditChange.viber.cutOffCredit,"is_notified":0}}}).then(()=>{
                                return ;
                            });
                    })
                        
                })

        }
        
    });
			
}