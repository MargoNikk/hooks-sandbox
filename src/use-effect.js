import React, { 
    useState, 
    Component, 
    useEffect, 
    useCallback } from "react";

const HookEffect = () => {
    const [value, setValue] = useState(0);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={() => setValue((v) => v + 1)}>
                    +
                </button>

                <button onClick={() => setVisible(false)}>
                    hide
                </button>

                <p>Class:</p>
                <ClassCounter value={value} />

                <p>useEffect:</p>
                <HookCounter value={value} />

                <p>With custom hooks: </p>
                <PlanetInfo id={value} />
                <hr />
                <br />
                <TemporaryAlert />
            </div>
        )
    }
    else {
        return <button onClick={() => setVisible(true)}>show</button>
    }
}

class ClassCounter extends Component {
    componentDidMount() {
        console.log('class mount')
    }

    componentDidUpdate() {
        console.log('class update')
    }
    
    componentWillUnmount() {
        console.log('class unmount')
    }

    render() {
        return <p>{this.props.value}</p>
    }
}

const HookCounter = ({ value }) => {

    useEffect(() => {
        console.log('Effect: componentDidMount');
    }, []); // empty array = componentDidMount

    useEffect(() => {
        console.log('Effect: componentDidUpdate + DidMount');

        // run as componentWillUnmount and before Update
        return () => console.log('Effect: componentWillUnmount + before Update');
    },
        // run only when value will change
        [value]);

    return <p>{value}</p>
}

const TemporaryAlert = () => {
    const [visible, setVisible] = useState(false);

    const mesg = 'It is a temporary message. I am going to hide in 3 sec!';

    const onClickShowMsg = () => {
        setVisible(true);
    };

    let timeoutId;

    useEffect(
        () => {
            if (visible) {
                timeoutId = setTimeout(() => {
                    setVisible(false);
                }, 3000);

                return () => {
                    clearTimeout(timeoutId);
                }
            }
        },
        [visible]
    );

    return (
        <div>
            <p>Temporary message is using by useEffect</p>
            <button onClick={onClickShowMsg}>Start</button>
            <br />
            {visible && mesg}
        </div>
    );
}

const getPlanet = (id) => {
    return fetch(`https://swapi.py4e.com/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
}

// Custom Hooks
const useRequest = (request, id) => {
    const [dataState, setDataState] = useState({
        data: null,
        loading: null,
        error: null
    });

    useEffect(() => {
        if (id > 0) {
            setDataState({
                data: null,
                loading: true,
                error: null
            });

            let cancelled = false;

            request()
                .then(data => !cancelled && setDataState({
                    data,
                    loading: false,
                    error: false
                }))
                .catch(err => !cancelled && setDataState({
                    data: null,
                    loading: false,
                    error: true
                }));

            return () => cancelled = true;
        }
    },
        [request]
    );

    return dataState;
};

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [id]);

    return useRequest(request, id);
};

const PlanetInfo = ({ id }) => {
    const { data, loading, error } = usePlanetInfo(id);

    if (error) {
        return <div>Something gone wrong! </div>
    }

    if (loading) {
        return <div>Loading ... </div>
    }

    return (
        <div>
            {id === 0 ?
                <p>Please, start increase a counter</p> :
                <p>Name of planet namber {id}: {data && data.name}</p>
            }
        </div>
    );
}

export default HookEffect;