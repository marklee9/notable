import React, { Component } from "react";
import {
	getAllPhysicians,
	getAppointmentsByPhysicianId,
} from "../util/physician_util";
import '../assets/css/home.css';

class HomeComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			physicians: [],
      appointments: [],
      selectedPhysician: 0,
    };
	}

	componentDidMount() {
		getAllPhysicians().then((physicians) =>
			this.setState(() => ({ physicians }))
		);
	}

	displayPhysicians() {
		return this.state.physicians.map(({ _id, firstName, lastName }, i) => (
			<li onClick={this.handlePhysicianClick(_id, i)} key={i}>
				{lastName}, {firstName}
			</li>
		));
	}

	handlePhysicianClick(id, i) {
    return () => {
      this.setState({selectedPhysician: i});
      getAppointmentsByPhysicianId(id).then((appointments) =>
        this.setState(() => ({ appointments }))
			);
    }
  }

  displayTitle() {
    if (this.state.physicians.length) {
      const { physicians, selectedPhysician } = this.state;
			const physician = physicians[selectedPhysician];
      return <div className="physician-info">
        <p className="title">
          Dr. {physician.firstName} {physician.lastName}
        </p>
        <p className="email">
          {physician.email}
        </p>
      </div>
    }
    return <div className="physician-info"></div>;
  }

  displayAppointments() {
    return <div className="appointment-list-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Time</th>
            <th>Kind</th>
          </tr>
        </thead>

        {this.state.appointments.map((app, i) => {
          const time = new Date(app.date);
          return (
						<tbody>
              <tr>
                <td>{i + 1}</td>
                <td>
                  {app.patientFirstName} {app.patientLastName}
                </td>
                <td>{this.displayTime(time)}</td>
                <td>{app.kind}</td>
              </tr>
						</tbody>
					);
        })}
      </table>
    </div>;
  }

  displayTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

	render() {
		return (
			<div className="container">
				<div className="physician-list">
          <p className="notable">Notable</p>
          <p className="physicians-text">Physicians</p>
					<ul>{this.displayPhysicians()}</ul>
				</div>
				<div className="appointment-list">
          {this.displayTitle()}
          {this.displayAppointments()}
				</div>
			</div>
		);
	}
}

export default HomeComponent;