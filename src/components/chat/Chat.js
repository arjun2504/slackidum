import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Chat extends Component {

    render() {
        
        return (this.props.match.params.username || this.props.match.params.group) ? (
            <div className="col-md-8 col-sm-12 chat-screen">
                <div className="chat-thread-container">
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Crasasdsa saf sa f sadgf da gds g ds gds g dsg dsgdsgdsknglk sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Crasasdsa saf sa f sadgf da gds g ds gds g dsg dsgdsgdsknglk sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Crasasdsa saf sa f sadgf da gds g ds gds g dsg dsgdsgdsknglk sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                    <div className="media chat-message">
                        <img src="https://via.placeholder.com/64" className="mr-3" alt="..." />
                        <div className="media-body">
                            <h5 className="mt-0">Media heading</h5>
                            Crasasdsa saf sa f sadgf da gds g ds gds g dsg dsgdsgdsknglk sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </div>
                </div>
                <div className="chat-input-container">
                    <textarea className="form-control" rows="1" placeholder="Type a message..."></textarea>
                </div>
            </div>
        ) : (
            <div className="col-md-8 col-sm-12 no-chat-screen">
                <div className="new-convo">
                    <img src="/static/images/grin.png" />
                    <h3>Start your conversation.</h3>
                    <p>Click on a contact on the sidebar to start a conversation.<br/>Click + to add a contact or create a group.</p>
                </div>
            </div>
        )
    }
}

export default connect()(withRouter(Chat))