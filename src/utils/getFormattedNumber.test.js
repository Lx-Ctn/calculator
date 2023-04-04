import { getFormattedNumber, getLimittedDigit } from "./getFormattedNumber";

describe("testing getLimittedDigit", () => {
	describe("1_000_000_000_000 should be 1E12", () => {
		test("1000000000000 should be 1E12", () => {
			expect(getLimittedDigit(1000000000000)).toBe("1E12");
		});
		test("'1000000000000' should be 1E12", () => {
			expect(getLimittedDigit("1000000000000")).toBe("1E12");
		});
		test("-1000000000000 should be -1E12", () => {
			expect(getLimittedDigit(-1000000000000)).toBe("-1E12");
		});
		test("'-1000000000000' should be -1E12", () => {
			expect(getLimittedDigit("-1000000000000")).toBe("-1E12");
		});
	});

	describe("1e+12 should be 1E12", () => {
		test("1e+12 should be 1E12", () => {
			expect(getLimittedDigit(1e12)).toBe("1E12");
		});
		test("'1e+12' should be 1E12", () => {
			expect(getLimittedDigit("1e+12")).toBe("1E12");
		});
		test("-1e+12 should be -1E12", () => {
			expect(getLimittedDigit(-1e12)).toBe("-1E12");
		});
		test("'-1e+12' should be -1E12", () => {
			expect(getLimittedDigit("-1e+12")).toBe("-1E12");
		});
	});

	describe("1_234_567_890_000 should be 1.23457E12", () => {
		test("1234567890000 should be 1.23457E12", () => {
			expect(getLimittedDigit(1234567890000)).toBe("1.23457E12");
		});
		test("'1234567890000' should be 1.23457E12", () => {
			expect(getLimittedDigit("1234567890000")).toBe("1.23457E12");
		});
		test("-1234567890000 should be -1.23457E12", () => {
			expect(getLimittedDigit(-1234567890000)).toBe("-1.23457E12");
		});
		test("'-1234567890000' should be -1.23457E12", () => {
			expect(getLimittedDigit("-1234567890000")).toBe("-1.23457E12");
		});
	});

	describe("1.23456789e12 should be 1.23457E12", () => {
		test("1.23456789e12 should be 1.23457E12", () => {
			expect(getLimittedDigit(1.23456789e12)).toBe("1.23457E12");
		});
		test("'1.23456789e12' should be 1.23457E12", () => {
			expect(getLimittedDigit("1.23456789e12")).toBe("1.23457E12");
		});
		test("-1.23456789e12 should be -1.23457E12", () => {
			expect(getLimittedDigit(-1.23456789e12)).toBe("-1.23457E12");
		});
		test("'-1.23456789e12' should be -1.23457E12", () => {
			expect(getLimittedDigit("-1.23456789e12")).toBe("-1.23457E12");
		});
	});

	describe("0.000_000_000_001 should be 1E-12", () => {
		test("0.000000000001 should be 1E-12", () => {
			expect(getLimittedDigit(0.000000000001)).toBe("1E-12");
		});
		test("'0.000000000001' should be 1E-12", () => {
			expect(getLimittedDigit("0.000000000001")).toBe("1E-12");
		});
		test("-0.000000000001 should be -1E-12", () => {
			expect(getLimittedDigit(-0.000000000001)).toBe("-1E-12");
		});
		test("'-0.000000000001' should be -1E-12", () => {
			expect(getLimittedDigit("-0.000000000001")).toBe("-1E-12");
		});
	});
	describe("1e-12 should be 1E-12", () => {
		test("1e-12 should be 1E-12", () => {
			expect(getLimittedDigit(1e-12)).toBe("1E-12");
		});
		test("'1e-12' should be 1E-12", () => {
			expect(getLimittedDigit("1e-12")).toBe("1E-12");
		});
		test("-1e-12 should be -1E-12", () => {
			expect(getLimittedDigit(-1e-12)).toBe("-1E-12");
		});
		test("'-1e-12' should be -1E-12", () => {
			expect(getLimittedDigit("-1e-12")).toBe("-1E-12");
		});
	});

	describe("0._000_000_001_234_567_89 should be 1.23457E-12", () => {
		test("0.00000000000123456789 should be 1.23457E-12", () => {
			expect(getLimittedDigit(0.00000000000123456789)).toBe("1.23457E-12");
		});
		test("'0.00000000000123456789' should be 1.23457E-12", () => {
			expect(getLimittedDigit("0.00000000000123456789")).toBe("1.23457E-12");
		});
		test("-0.00000000000123456789 should be -1.23457E-12", () => {
			expect(getLimittedDigit(-0.00000000000123456789)).toBe("-1.23457E-12");
		});
		test("'-0.00000000000123456789' should be -1.23457E-12", () => {
			expect(getLimittedDigit("-0.00000000000123456789")).toBe("-1.23457E-12");
		});
	});
	describe("1.23456789e-12 should be 1.23457E-12", () => {
		test("1.23456789e-12 should be 1.23457E-12", () => {
			expect(getLimittedDigit(1.23456789e-12)).toBe("1.23457E-12");
		});
		test("'1.23456789e-12' should be 1.23457E-12", () => {
			expect(getLimittedDigit("1.23456789e-12")).toBe("1.23457E-12");
		});
		test("-1.23456789e-12 should be -1.23457E-12", () => {
			expect(getLimittedDigit(-1.23456789e-12)).toBe("-1.23457E-12");
		});
		test("'-1.23456789e-12' should be -1.23457E-12", () => {
			expect(getLimittedDigit("-1.23456789e-12")).toBe("-1.23457E-12");
		});
	});

	describe("0.1111111111111111 should be 0.1111111111", () => {
		test("0.1111111111111111 should be 0.1111111111", () => {
			expect(getLimittedDigit(0.1111111111111111)).toBe("0.1111111111");
		});
		test("'0.1111111111111111' should be 0.1111111111", () => {
			expect(getLimittedDigit("0.1111111111111111")).toBe("0.1111111111");
		});
		test("-0.1111111111111111 should be -0.1111111111", () => {
			expect(getLimittedDigit(-0.1111111111111111)).toBe("-0.1111111111");
		});
		test("'-0.1111111111111111' should be -0.1111111111", () => {
			expect(getLimittedDigit("-0.1111111111111111")).toBe("-0.1111111111");
		});
	});

	describe("0.6666666666666666 should be 0.6666666667", () => {
		test("0.6666666666666666 should be 0.6666666667", () => {
			expect(getLimittedDigit(0.6666666666666666)).toBe("0.6666666667");
		});
		test("'0.6666666666666666' should be 0.6666666667", () => {
			expect(getLimittedDigit("0.6666666666666666")).toBe("0.6666666667");
		});
		test("-0.6666666666666666 should be -0.6666666667", () => {
			expect(getLimittedDigit(-0.6666666666666666)).toBe("-0.6666666667");
		});
		test("'-0.6666666666666666' should be -0.6666666667", () => {
			expect(getLimittedDigit("-0.6666666666666666")).toBe("-0.6666666667");
		});
	});

	describe("0.9999999999999999 should be 1", () => {
		test("0.9999999999999999 should be 1", () => {
			expect(getLimittedDigit(0.9999999999999999)).toBe("1");
		});
		test("'0.9999999999999999' should be 1", () => {
			expect(getLimittedDigit("0.9999999999999999")).toBe("1");
		});
		test("-0.9999999999999999 should be -1", () => {
			expect(getLimittedDigit(-0.9999999999999999)).toBe("-1");
		});
		test("'-0.9999999999999999' should be -1", () => {
			expect(getLimittedDigit("-0.9999999999999999")).toBe("-1");
		});
	});

	describe("01234.5600 should be 1234.56", () => {
		test("01234.56 should be 1234.56", () => {
			expect(getLimittedDigit(1234.56)).toBe("1,234.56");
		});
		test("'01234.5600' should be 1234.56", () => {
			expect(getLimittedDigit("01234.5600")).toBe("1,234.56");
		});
		test("-01234.5600 should be -1234.56", () => {
			expect(getLimittedDigit(-1234.56)).toBe("-1,234.56");
		});
		test("'-01234.5600' should be -1234.56", () => {
			expect(getLimittedDigit("-01234.5600")).toBe("-1,234.56");
		});
	});

	describe("0 should be 0", () => {
		test("0 should be 0", () => {
			expect(getLimittedDigit(0)).toBe("0");
		});
		test("'0' should be 0", () => {
			expect(getLimittedDigit("0")).toBe("0");
		});
		test("-0 should be 0", () => {
			expect(getLimittedDigit(-0)).toBe("0");
		});
		test("'-0' should be 0", () => {
			expect(getLimittedDigit("-0")).toBe("0");
		});
	});

	describe("Infinity should be ∞", () => {
		test("Infinity should be ∞", () => {
			expect(getLimittedDigit(Infinity)).toBe("∞");
		});
		test("'Infinity' should be ∞", () => {
			expect(getLimittedDigit("Infinity")).toBe("∞");
		});
		test("-Infinity should be -∞", () => {
			expect(getLimittedDigit(-Infinity)).toBe("-∞");
		});
		test("'-Infinity' should be -∞", () => {
			expect(getLimittedDigit("-Infinity")).toBe("-∞");
		});
	});

	describe("NaN should be NaN", () => {
		test("NaN should be NaN", () => {
			expect(getLimittedDigit(NaN)).toBe("NaN");
		});
		test("'NaN' should be NaN", () => {
			expect(getLimittedDigit("NaN")).toBe("NaN");
		});
	});
});
/*




GetFormattedNumber */
describe("testing getFormattedNumber", () => {
	describe("1_000_000_000_000 should be 1e+12", () => {
		test("1000000000000 should be 1e+12", () => {
			expect(getFormattedNumber(1000000000000)).toStrictEqual({ value: "1000000000000", display: "1e+12" });
		});
		test("'1000000000000' should be 1e+12", () => {
			expect(getFormattedNumber("1000000000000")).toStrictEqual({ value: "1000000000000", display: "1e+12" });
		});
		test("-1000000000000 should be -1e+12", () => {
			expect(getFormattedNumber(-1000000000000)).toStrictEqual({ value: "-1000000000000", display: "-1e+12" });
		});
		test("'-1000000000000' should be -1e+12", () => {
			expect(getFormattedNumber("-1000000000000")).toStrictEqual({
				value: "-1000000000000",
				display: "-1e+12",
			});
		});
	});

	describe("1e+12 should be 1e+12", () => {
		test("1e+12 should be 1e+12", () => {
			expect(getFormattedNumber(1e12)).toStrictEqual({ value: "1000000000000", display: "1e+12" });
		});
		test("'1e+12' should be 1e+12", () => {
			expect(getFormattedNumber("1e+12")).toStrictEqual({ value: "1e+12", display: "1e+12" });
		});
		test("-1e+12 should be -1e+12", () => {
			expect(getFormattedNumber(-1e12)).toStrictEqual({ value: "-1000000000000", display: "-1e+12" });
		});
		test("'-1e+12' should be -1e+12", () => {
			expect(getFormattedNumber("-1e+12")).toStrictEqual({ value: "-1e+12", display: "-1e+12" });
		});
	});

	describe("1_234_567_890_000 should be 1.23457e+12", () => {
		test("1234567890000 should be 1.23457e+12", () => {
			expect(getFormattedNumber(1234567890000)).toStrictEqual({
				value: "1234567890000",
				display: "1.23457e+12",
			});
		});
		test("'1234567890000' should be 1.23457e+12", () => {
			expect(getFormattedNumber("1234567890000")).toStrictEqual({
				value: "1234567890000",
				display: "1.23457e+12",
			});
		});
		test("-1234567890000 should be -1.23457e+12", () => {
			expect(getFormattedNumber(-1234567890000)).toStrictEqual({
				value: "-1234567890000",
				display: "-1.23457e+12",
			});
		});
		test("'-1234567890000' should be -1.23457e+12", () => {
			expect(getFormattedNumber("-1234567890000")).toStrictEqual({
				value: "-1234567890000",
				display: "-1.23457e+12",
			});
		});
	});

	describe("1.23456789e+12 should be 1.23457e+12", () => {
		test("1.23456789e+12 should be 1.23457e+12", () => {
			expect(getFormattedNumber(1.23456789e12)).toStrictEqual({
				value: "1234567890000",
				display: "1.23457e+12",
			});
		});
		test("'1.23456789e+12' should be 1.23457e+12", () => {
			expect(getFormattedNumber("1.23456789e12")).toStrictEqual({
				value: "1.23456789e12",
				display: "1.23457e+12",
			});
		});
		test("-1.23456789e+12 should be -1.23457e+12", () => {
			expect(getFormattedNumber(-1.23456789e12)).toStrictEqual({
				value: "-1234567890000",
				display: "-1.23457e+12",
			});
		});
		test("'-1.23456789e+12' should be -1.23457e+12", () => {
			expect(getFormattedNumber("-1.23456789e12")).toStrictEqual({
				value: "-1.23456789e12",
				display: "-1.23457e+12",
			});
		});
	});

	describe("0.000_000_000_001 should be 1e-12", () => {
		test("0.000000000001 should be 1e-12", () => {
			expect(getFormattedNumber(0.000000000001)).toStrictEqual({
				value: "1e-12",
				display: "1e-12",
			});
		});
		test("'0.000000000001' should be 1e-12", () => {
			expect(getFormattedNumber("0.000000000001")).toStrictEqual({
				value: "0.000000000001",
				display: "1e-12",
			});
		});
		test("-0.000000000001 should be -1e-12", () => {
			expect(getFormattedNumber(-0.000000000001)).toStrictEqual({
				value: "-1e-12",
				display: "-1e-12",
			});
		});
		test("'-0.000000000001' should be -1e-12", () => {
			expect(getFormattedNumber("-0.000000000001")).toStrictEqual({
				value: "-0.000000000001",
				display: "-1e-12",
			});
		});
	});

	describe("1e-12 should be 1e-12", () => {
		test("1e-12 should be 1e-12", () => {
			expect(getFormattedNumber(1e-12)).toStrictEqual({
				value: "1e-12",
				display: "1e-12",
			});
		});
		test("'1e-12' should be 1e-12", () => {
			expect(getFormattedNumber("1e-12")).toStrictEqual({
				value: "1e-12",
				display: "1e-12",
			});
		});
		test("-1e-12 should be -1e-12", () => {
			expect(getFormattedNumber(-1e-12)).toStrictEqual({
				value: "-1e-12",
				display: "-1e-12",
			});
		});
		test("'-1e-12' should be -1e-12", () => {
			expect(getFormattedNumber("-1e-12")).toStrictEqual({
				value: "-1e-12",
				display: "-1e-12",
			});
		});
	});

	describe("0._000_000_001_234_567_89 should be 1.23457e-12", () => {
		test("0.00000000000123456789 should be 1.23457e-12", () => {
			expect(getFormattedNumber(0.00000000000123456789)).toStrictEqual({
				value: "1.23456789e-12",
				display: "1.23457e-12",
			});
		});
		test("'0.00000000000123456789' should be 1.23457e-12", () => {
			expect(getFormattedNumber("0.00000000000123456789")).toStrictEqual({
				value: "0.00000000000123456789",
				display: "1.23457e-12",
			});
		});
		test("-0.00000000000123456789 should be -1.23457e-12", () => {
			expect(getFormattedNumber(-0.00000000000123456789)).toStrictEqual({
				value: "-1.23456789e-12",
				display: "-1.23457e-12",
			});
		});
		test("'-0.00000000000123456789' should be -1.23457e-12", () => {
			expect(getFormattedNumber("-0.00000000000123456789")).toStrictEqual({
				value: "-0.00000000000123456789",
				display: "-1.23457e-12",
			});
		});
	});
	describe("1.23456789e-12 should be 1.23457E-12", () => {
		test("1.23456789e-12 should be 1.23457E-12", () => {
			expect(getFormattedNumber(1.23456789e-12)).toStrictEqual({
				value: "1.23456789e-12",
				display: "1.23457e-12",
			});
		});
		test("'1.23456789e-12' should be 1.23457E-12", () => {
			expect(getFormattedNumber("1.23456789e-12")).toStrictEqual({
				value: "1.23456789e-12",
				display: "1.23457e-12",
			});
		});
		test("-1.23456789e-12 should be -1.23457E-12", () => {
			expect(getFormattedNumber(-1.23456789e-12)).toStrictEqual({
				value: "-1.23456789e-12",
				display: "-1.23457e-12",
			});
		});
		test("'-1.23456789e-12' should be -1.23457E-12", () => {
			expect(getFormattedNumber("-1.23456789e-12")).toStrictEqual({
				value: "-1.23456789e-12",
				display: "-1.23457e-12",
			});
		});
	});

	describe("0.1111111111111111 should be 0.1111111111", () => {
		test("0.1111111111111111 should be 0.1111111111", () => {
			expect(getFormattedNumber(0.1111111111111111)).toStrictEqual({
				value: "0.1111111111111111",
				display: "0.1111111111",
			});
		});
		test("'0.1111111111111111' should be 0.1111111111", () => {
			expect(getFormattedNumber("0.1111111111111111")).toStrictEqual({
				value: "0.1111111111111111",
				display: "0.1111111111",
			});
		});
		test("-0.1111111111111111 should be -0.1111111111", () => {
			expect(getFormattedNumber(-0.1111111111111111)).toStrictEqual({
				value: "-0.1111111111111111",
				display: "-0.1111111111",
			});
		});
		test("'-0.1111111111111111' should be -0.1111111111", () => {
			expect(getFormattedNumber("-0.1111111111111111")).toStrictEqual({
				value: "-0.1111111111111111",
				display: "-0.1111111111",
			});
		});
	});

	describe("0.6666666666666666 should be 0.6666666667", () => {
		test("0.6666666666666666 should be 0.6666666667", () => {
			expect(getFormattedNumber(0.6666666666666666)).toStrictEqual({
				value: "0.6666666666666666",
				display: "0.6666666667",
			});
		});
		test("'0.6666666666666666' should be 0.6666666667", () => {
			expect(getFormattedNumber("0.6666666666666666")).toStrictEqual({
				value: "0.6666666666666666",
				display: "0.6666666667",
			});
		});
		test("-0.6666666666666666 should be -0.6666666667", () => {
			expect(getFormattedNumber(-0.6666666666666666)).toStrictEqual({
				value: "-0.6666666666666666",
				display: "-0.6666666667",
			});
		});
		test("'-0.6666666666666666' should be -0.6666666667", () => {
			expect(getFormattedNumber("-0.6666666666666666")).toStrictEqual({
				value: "-0.6666666666666666",
				display: "-0.6666666667",
			});
		});
	});

	describe("0.9999999999999999 should be 1", () => {
		test("0.9999999999999999 should be 1", () => {
			expect(getFormattedNumber(0.9999999999999999)).toStrictEqual({
				value: "0.9999999999999999",
				display: "1",
			});
		});
		test("'0.9999999999999999' should be 1", () => {
			expect(getFormattedNumber("0.9999999999999999")).toStrictEqual({
				value: "0.9999999999999999",
				display: "1",
			});
		});
		test("-0.9999999999999999 should be -1", () => {
			expect(getFormattedNumber(-0.9999999999999999)).toStrictEqual({
				value: "-0.9999999999999999",
				display: "-1",
			});
		});
		test("'-0.9999999999999999' should be -1", () => {
			expect(getFormattedNumber("-0.9999999999999999")).toStrictEqual({
				value: "-0.9999999999999999",
				display: "-1",
			});
		});
	});

	describe("01234.5600 should be 1234.56", () => {
		test("01234.56 should be 1234.56", () => {
			expect(getFormattedNumber(1234.56)).toStrictEqual({
				value: "1234.56",
				display: "1234.56",
			});
		});
		test("'01234.5600' should be 1234.56", () => {
			expect(getFormattedNumber("01234.5600")).toStrictEqual({
				value: "01234.5600",
				display: "1234.56",
			});
		});
		test("-01234.5600 should be -1234.56", () => {
			expect(getFormattedNumber(-1234.56)).toStrictEqual({
				value: "-1234.56",
				display: "-1234.56",
			});
		});
		test("'-01234.5600' should be -1234.56", () => {
			expect(getFormattedNumber("-01234.5600")).toStrictEqual({
				value: "-01234.5600",
				display: "-1234.56",
			});
		});
	});

	describe("0 should be 0", () => {
		test("0 should be 0", () => {
			expect(getFormattedNumber(0)).toStrictEqual({
				value: "0",
				display: "0",
			});
		});
		test("'0' should be 0", () => {
			expect(getFormattedNumber("0")).toStrictEqual({
				value: "0",
				display: "0",
			});
		});
		test("-0 should be 0", () => {
			expect(getFormattedNumber(-0)).toStrictEqual({
				value: "0",
				display: "0",
			});
		});
		test("'-0' should be 0", () => {
			expect(getFormattedNumber("-0")).toStrictEqual({
				value: "0",
				display: "0",
			});
		});
	});

	describe("Infinity should be ∞", () => {
		test("Infinity should be ∞", () => {
			expect(getFormattedNumber(Infinity)).toStrictEqual({
				value: "Infinity",
				display: "∞",
			});
		});
		test("'Infinity' should be ∞", () => {
			expect(getFormattedNumber("Infinity")).toStrictEqual({
				value: "Infinity",
				display: "∞",
			});
		});
		test("-Infinity should be -∞", () => {
			expect(getFormattedNumber(-Infinity)).toStrictEqual({
				value: "-Infinity",
				display: "-∞",
			});
		});
		test("'-Infinity' should be -∞", () => {
			expect(getFormattedNumber("-Infinity")).toStrictEqual({
				value: "-Infinity",
				display: "-∞",
			});
		});
	});

	describe("NaN should be Impossible", () => {
		test("NaN should be NaN", () => {
			expect(getFormattedNumber(NaN)).toStrictEqual({
				value: NaN,
				display: "Impossible",
			});
		});
		test("'NaN' should be Impossible", () => {
			expect(getFormattedNumber("NaN")).toStrictEqual({
				value: NaN,
				display: "Impossible",
			});
		});
	});

	test("null should be null", () => {
		expect(getFormattedNumber(null)).toBe(null);
	});
});
