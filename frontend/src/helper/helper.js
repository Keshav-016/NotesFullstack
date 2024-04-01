export async function addNote() {
    const storageData = JSON.parse(localStorage.getItem('data'));
    const token = storageData?.token;
    if (!token) {
        alert("User not logged in");
        navigate('/login');
        return;
    }
    try {
        setLoaded(true);
        if (!editCheck) {
            await axios.post("http://127.0.0.1:5000/notes/add-note",
                {
                    title: newTitle,
                    description: newDescription
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                },)
            SweetAlert("successfully added the note")
            setLoaded(false);
        }
        else {
            await axios.put(`http://127.0.0.1:5000/notes/update-note/${cardEdit._id}`,
                {
                    title: newTitle,
                    description: newDescription
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                },)
            SweetAlert("successfully updated the note");

            setLoaded(false);
            setEditCheck(false);
        }
    }
    catch (error) {
        const message = error.response.data.message
        SweetAlertError(message);
    }
}