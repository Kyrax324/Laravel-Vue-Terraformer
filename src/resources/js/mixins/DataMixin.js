export const dataMixin = {
	data() {
		return {
        	tableData : [],
        	infoData : {},
      		dialog : false,
      		dialogItem: {},
        	options: {},
        	totalData : 0,
        	tableLoading : false,
        	noResult : false,
        	search : {},
        	filters : {},
        	refs : {}
		}
	},
	created() {
	},
	watch: {
      	options: {
	        handler () {
	        	this.getModel()
        	},
        	deep: true,
      	},
    },
    beforeRouteLeave(to, from, next) {
    	if(from.name+'.info' == to.name){
    		from.meta.keepAlive = true
    	}else{
    		from.meta.keepAlive = false
    	}
    	next()
  	},
	methods:{
		initialize(){
			this.getModel()
			this.dialogItem = this.emptyModel()
			this.closeDialog()
		},
		emptyModel(){
			console.log("remember to overwrite me.")
		},
		getModel(){
			console.log("remember to overwrite me.")
		},
		archiveModel(item){
			console.log("remember to overwrite me.")
		},
		bindAction(action,item){
			this.action = action
	        this.dialogItem = (action == 'new') ? this.emptyModel() : Object.assign({}, item)
 			this.dialog = true
		},
		confirmArchive(item){
			this.$swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
			}).then((res)=>{
				if(res.value){
					this.archiveModel(item)
				}
			})
		},
		closeDialog(){
			this.dialog = false
		},
		setPagination(){
			const { page, sortBy, sortDesc, itemsPerPage } = this.options
        	let pagination = {
        		"page": page,
        		"sortBy": sortBy+"",
        		"sortDesc": sortDesc+"",
        		"itemsPerPage": itemsPerPage
        	}
        	return pagination;
		},
		unsetLoading(){
			setTimeout(() => {
            	this.tableLoading = false
          	}, 800)
		},
        selectThis(item){
        	this.$emit('selected',item)
        }
		
	}
}