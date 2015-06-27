var UserForm = React.createClass({
  propTypes: {
    sciper: React.PropTypes.string,
    name: React.PropTypes.string,
    role: React.PropTypes.string,
    email: React.PropTypes.string
  },
  getInitialState: function(){
    return {
      sciper: '',
      name: '',
      role: 'student',
      studio: '',
      email: '',
      roles: this.props.roles,
      studios: this.props.studios,
      errors: {}
    };
  },
  handleChange: function(e){
    var name = e.target.name;
    var stateChanger = {};
    stateChanger[name] = e.target.value;
    this.setState(stateChanger);
  },
  handleRoleChange: function(value){
    this.setState({
      role: value
    });
  },
  handleStudioChange: function(value){
    this.setState({
      studio: value
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
    var that = this;
    var success = function(data) {
      that.props.handleNewUser(data);
      that.setState(that.getInitialState())
    };
    var error = function(data){
      that.setState({
        errors: data.responseJSON
      });
      console.log("data:", that.state.errors);

    };
    debugger;
    $.post('users/create', {
      user: {
        email: this.state.email,
        name: this.state.name,
        sciper: this.state.sciper,
        role: this.state.role,
      },
      studio: this.state.studio,
    }, success, 'JSON').fail(error);
  },
  valid: function(){
    var emailValid = /^[\w\.-_\d]+@epfl\.ch$/.test(this.state.email);
    return emailValid;
  },
  render: function() {
    return (
      <form action="" className="form-inline" onSubmit={this.handleSubmit}>
        <FormErrors errors={this.state.errors}/>
        <div className="form-group">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="sciper" name="sciper" value={this.state.sciper} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <Select name="role" 
              value={this.state.role} 
              options={this.props.roles.map(function(r){
                return {value: r, label: r};
              })}
              clearable={false}
              searchable={false}
              onChange={this.handleRoleChange}
            />
            <Select name="studio" value={this.state.studio} 
              options={this.props.studios.map(function(s){
                return {value: s.name, label: s.name};
              })}
              clearable={false}
              onChange={this.handleStudioChange}
            />
          <button className="btn btn-primary" type="submit" disabled={!this.valid()}>Add User</button>
        </div>
      </form>
    );
  }
});
