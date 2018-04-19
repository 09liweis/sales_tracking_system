import React from 'react';

export default class Birthday extends React.Component {
    constructor() {
        super();
        this.state = {
            birthday: new Date('2018-04-22').getTime(),
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    componentDidMount() {
        this.countdown();
    }
    countdown() {
        const birthday = this.state.birthday;
        this.countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = birthday - now;
            this.setState({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);
    }
    render() {
        const {days, hours, minutes, seconds} = this.state;
        return (
            <div className="countdown">
                还有 {days}天 {hours}时 {minutes}分 {seconds}秒
            </div>
        );
    }
}