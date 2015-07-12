var StudiosTable = React.createClass({
	getInitialState: function(){
		return {
			studios: this.props.studios
		}
	},
	updateParents: function(studios_){
		this.props.handleStudios(studios_);
		this.setState(this.getInitialState());
	},
	render: function() {
		var that = this;
		var studioRow = function(studio){
			var destroyStudio = function(){
				$.ajax({
					url: "/studios/"+studio.id,
					method: 'delete',
					success: function(res){
				    var index = that.state.studios.indexOf(studio);
						var studios_ = React.addons.update(that.state.studios, { $splice: [[index, 1]] })
						that.updateParents(studios_);
					},
				});
			};
			var toggleEditable = function(){
				if(!studio.editable)
				{
					studio.originalName = studio.name;
				}
				else{
					studio.name = studio.originalName;
				} 
				var studios_ = that.state.studios.map(function(s){
					s.editable = s === studio ? !s.editabe : false;
					return s;
				});
				that.setState({
					studios: studios_
				});
			};
			var handleKey = function(e){
				if(e.keyCode == '27')
				{
					toggleEditable();
				}
				else if(e.keyCode == '13')
				{
					submitChange();
				}
				else
				{
					studio.name = e.target.value;
				}
			};

			var submitChange = function(){
				$.ajax({
					url: '/studios/'+studio.id,
					method: 'PUT',
					data: {
						studio:{
							name: studio.name,
						}
					},
					success: function(data){
						var index = that.state.studios.indexOf(studio);
						var studios_ = React.addons.update(that.state.studios, { $splice: [[index, 1, data]] });
						that.updateParents(studios_);
					},
					error: function(e){
						alert('Error editing the studio')
					}
				})
			};
			var name, action;
			if(studio.editable)
			{
				name = <td className="field"><input type="text" defaultValue={studio.name} onKeyUp={handleKey}/></td>;
				action = <button className="ui button basic green mini" onClick={submitChange}> Save </button>
			}
			else
			{
				name = <td className="inline" onDoubleClick={toggleEditable}>{studio.name}</td>
				action = <button className="ui button basic mini" onClick={toggleEditable}> Edit </button>
			}

			return <table className={"ui table compact striped " + (studio.editable ? ' form' : null)}>
				<tr className="fields">
					{name}
					<td>
						{action}
						<button className="ui button red basic mini" onClick={destroyStudio}> Delete </button>
						</td>
					</tr>
			</table>;
		};
		return <div>
			{this.state.studios.map(function(s){
				return studioRow(s);
			})}
		</div>;
	}
});