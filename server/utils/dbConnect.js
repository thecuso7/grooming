import { Counters } from "~/server/models";

export async function getNextSequence(name) {
    const res = await Counters.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } }, {new: true});

    console.log('res', res);

    return res.seq;
}