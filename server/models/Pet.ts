import mongoose from 'mongoose';
import { defaultUsers } from './User';

export const defaultPets = [
	{
		_id: '661c0a1b8f1a2b3c4d5e6c7a',
		id: 1,
		image: "",
		name: "Питомец 1",
		age: "1 год",
		breed: "Порода 1",
		weight: "5",
		features: '',
		userId: '68dd3b4bf6fe557d9ba79c4b',
	},
	{
		_id: '661c0a1b8f1a2b3c4d5e6c7b',
		id: 2,
		image: "",
		name: "Питомец 2",
		age: "2 года",
		breed: "Порода 2",
		weight: "6",
		features: '',
		userId: '68dd3b4bf6fe557d9ba79c4b',
	}
];

const petSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
	},
	name: {
		type: String,
	},
	age: {
		type: String,
	},
	breed: {
		type: String,
	},
	weight: {
		type: String,
	},
	features: {
		type: String,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		default: defaultUsers[0]._id
	},
});

export const Pet = mongoose.models.Pet || mongoose.model('Pet', petSchema);