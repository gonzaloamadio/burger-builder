// HOC component, that will wrap a component that should have this error handling.
import React from 'react'

import Modal from '../../components/UI/Modal/Modal'

// Essentially is a class factory. withErrorHandler create these classes.
// Could be a functional component with useEffect.
// As argument takes: The wrapped component, and the axios intance.
// The axios instance which was used  a global error handler on it.
const withErrorHandler = (WrappedComponent, axios) => {
    // Anonymus class, we do not use it anywhere else.
    return class extends React.Component {
        state = {
            error : null
        }    
        componentDidMount(){
            axios.interceptors.response.use(res => res, error => {
                /* Set up axios listener. Set up global interceptor
                which allow us to handle errors.

                ARGS: 
                    - response handler. Take res and return it.
                    - Error obj, that is coming from API query.
                 */
                this.setState({error:error})
            })
            // When a req is sent, clear error.
            axios.interceptors.request.use(req => {
                this.setState({error:null})
                return req
            })

        }

        render() {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={() => {this.setState({error:null})}}
                    >
                        {/* As modal is always present (it is only outside viewport),
                        we have to check if there is message to show, if not will give error. */}
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler