import config from '@/js/configs'

const appTitle = config.appTitle

export function setPageTitle(pageName){
	document.title = (pageName != undefined) ? pageName + ' – ' + appTitle : appTitle;
}

export function errorHandler(err, mode){
    let responseMsg = "Something Is Not Right. Please Try Again Later."
    if( err != undefined && err.data != undefined ){
        if(err.data.result != undefined || err.data.message != undefined){
            if(mode == 422){
                return err.data.message
            }else{
                this.$toast.warning(err.data.message)
            }
        }else{
            let message = err.data
            if(typeof(message) === 'object'){
                let firstKey = Object.keys(message)[0]
                this.$toast.warning(message[firstKey][0])
            }else{
                this.$toast.warning(message)
            }
        }
    }else{
        this.$toast.warning(responseMsg)
    }
    console.log(err)
}
