const crypto = require("crypto");

function createHashFromData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex")
}

function reHashIfTooLong(data, maxLength) {
  if (typeof data !== "string") {
    throw new Error("reHashIfTooLong only accepts strings on input variable `data`")
  }

  if (data.length > maxLength) {
    return createHashFromData(data)
  }

  return data
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) {
    return reHashIfTooLong(TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH)
  }

  if (!event.partitionKey) {
    return reHashIfTooLong(createHashFromData(JSON.stringify(event)), MAX_PARTITION_KEY_LENGTH)
  }

  const partitionKey = typeof event.partitionKey !== "string" ? JSON.stringify(event.partitionKey) : event.partitionKey

  return reHashIfTooLong(partitionKey, MAX_PARTITION_KEY_LENGTH)
};

// Export functions to include in testing
exports.exportedForTesting = {
  reHashIfTooLong
}