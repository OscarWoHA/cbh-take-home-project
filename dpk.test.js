const { deterministicPartitionKey, exportedForTesting } = require("./dpk");

describe("reHashIfTooLong", () => {
  it("Only accepts string in input field `data`", () => {
    expect(() => exportedForTesting.reHashIfTooLong({}, 1)).toThrow("reHashIfTooLong only accepts strings on input variable `data`")
  })
})

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns partitionKey from input", () => {
    const partitionKey = deterministicPartitionKey({
      partitionKey: "TEST_STRING"
    })

    expect(partitionKey).toBe("TEST_STRING")
  });

  it("Returns correct hash based on input", () => {
    const hash = "6fa5abff0f6a1c095ab9f3cdac422070dedd13cd7438bbb6761598561e292575919252b90df62b21452e760d886558ccc9d7d0bbebd4b00e061a504f832e50d7"
    const event = { test: "data" }

    const partitionKey = deterministicPartitionKey(event)

    expect(partitionKey).toBe(hash)
  })

  it("Returns a string even when partitionKey is object", () => {
    const partitionKey = deterministicPartitionKey({
      partitionKey: {
        data: "test"
      }
    })

    expect(typeof partitionKey).toBe("string")
  })

  it("Returns a hash if input is too long", () => {
    const hash = "c2a06e4d85cd9c56eb97ded3d8813728f9542e3e9825dd44d5d881a29a7c4de28c5ba7e4da4db34d0c34ae0d4bee762ab058b2798177aed642aadf809312ccfa"
    const twoHundredFiftySevenChars = "TWs06tCcZDRwR8uU3W2lazUJs80dfCdEOK7WgARY2rcI4kVWa2QYATbpkEmcHXxVRI4Jg1Wa6MpwcnbsVU38haHgPCnyjbiCJbjXPQTTr5k1s1K6eGtRf85noH7x6EWTr7MkJA6eYUQottYmvrZZYJa0DY3iCClRghJcSSgBNhfdMPC5f1GTiAP6LgEA41A0qIkK11x56A6ChUZWpsCZbODcySyIQrOuEhWkzwGHuoV1VSk3NBqbrdbRDu4mP4fl5"
    
    const partitionKey = deterministicPartitionKey({
      partitionKey: twoHundredFiftySevenChars
    })

    expect(partitionKey).toBe(hash)
  })
});
