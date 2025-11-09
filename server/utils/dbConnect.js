import { Counters } from "~/server/models";

export async function getNextSequence(name) {
    const res = await Counters.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, {new: true});

    return res.seq;
}

export async function minusSequence(name) {
    await Counters.findOneAndUpdate({ _id: name }, { $inc: { seq: -1 } }, {new: true});
}