import { Notes } from '../model/notesModel.js';
import { StatusCodes } from 'http-status-codes';

export async function getAll(req, res, next) {
    try {
        const data = await Notes.find({ userId: req.userId });
        if (data.length === 0) {
            throw new Error('No data exists');
        }
        return res.status(StatusCodes.OK).json({ data: data, message: 'success' });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function getNote(req, res, next) {
    try {
        const notesTitle = req.query.title;
        const noteData = await Notes.find({
            title: { $regex: notesTitle },
            userId: req.userId,
        });
        return res.status(StatusCodes.OK).json({ data: noteData, message: "Successfully got the resource" });
    } catch (error) {
        next({ status: StatusCodes.NOT_FOUND, message: error.message });
    }
}

export async function updateNote(req, res, next) {
    try {
        const noteId = req.params.id;
        const existence = await Notes.find({id:noteId , title: req.body.title , description : req.body.description})
        if (existence.length ===0) {
            throw new Error("Note with same title already exists")
        }
        const data = await Notes.findByIdAndUpdate(
            noteId,
            { title: req.body.title, description: req.body.description },
            { returnOriginal: false }
        );
        return res.status(StatusCodes.OK).json({ data: data, message: 'Succesfully Updated' });
    } catch (error) {
        next({ status: StatusCodes.BAD_REQUEST, message: error.message });
    }
}

export async function addNote(req, res, next) {
    try {
        const existence = await Notes.find({ title: req.body.title, userId: req.userId });
        if (existence.length !== 0) {
            throw new Error("This Note already exists");
        }
        const note = new Notes({
            title: req.body.title,
            description: req.body.description,
            userId: req.userId,
            isVisible: true,
        });
        await note.save();
        return res.status(StatusCodes.CREATED).json({ data: req.body, message: 'Succesfully Created' });
    } catch (error) {
        next({ status: StatusCodes.CONFLICT, message: error.message });
    }
}

export async function deleteNote(req, res, next) {
    try {
        const noteId = req.params.id;
        const data = await Notes.findByIdAndDelete(noteId);
        return res.status(StatusCodes.OK).json({ data: data, message: 'Succesfully Deleted Above Data' });
    } catch (error) {
        next({ status: StatusCodes.NOT_FOUND, message: error.message });
    }
}

export async function latestUpdatedNotes(req, res, next) {
    try {
        const data = await Notes.find({ userId: req.userId, isVisible: true }).sort({ updatedAt: -1 }).limit(3);
        if (!data) {
            throw new Error("No data to display");
        }
        return res.status(StatusCodes.OK).json({ data: data, message: "Last 3 updated data received" });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function showHidden(req, res, next) {
    try {
        const data = await Notes.find({ userId: req.userId, isVisible: false });
        if (!data) {
            throw new Error("No data to display");
        }
        return res.status(StatusCodes.OK).json({ data: data, message: "Hidden notes received" });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function showVisible(req, res, next) {
    try {
        const data = await Notes.find({ userId: req.userId, isVisible: true });
        if (!data) {
            throw new Error("No data to display");
        }
        return res.status(StatusCodes.OK).json({ data: data, message: "Visible notes received" });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function hideNote(req, res, next) {
    try {
        const data = await Notes.updateMany({ _id: { $in: req.body.itemIds } }, { isVisible: false });
        return res.status(StatusCodes.OK).json({ data: data, message: 'Updated' });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function toggleVisiblity(req, res, next) {
    try {
        const dbData = await Notes.findOne({_id:req.query.id})
        const data = await Notes.updateOne({ _id: req.query.id }, { isVisible: dbData.isVisible ? false : true });
        return res.status(StatusCodes.OK).json({ data: data, message: 'Updated' });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function deleteMany(req, res, next) {
    try {
        const data = await Notes.deleteMany({ _id: { $in: req.body.itemIds } });
        return res.status(StatusCodes.OK).json({ data: data, message: 'Deleted' });
    } catch (error) {
        next({ status: StatusCodes.INTERNAL_SERVER_ERROR, message: error.message });
    }
}

export async function wrongUrl(req, res, next) {
    return res.status(StatusCodes.BAD_REQUEST).json({ data: null, message: "Wrong url" })
}
