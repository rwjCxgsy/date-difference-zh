interface DateDiff {
  format: (fmt: string) => string;
}

export function getDateDifference(
  string: start,
  end = new Date(),
  options = {}
): DateDiff {}
