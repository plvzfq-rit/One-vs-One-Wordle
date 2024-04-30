f = open('six_raw.txt', 'r')
words = set()
for lines in f:
    words = words.union(set(lines.split()))
f.close()
f = open('six_letter_words.txt', 'w')
words = sorted(list(words))
f.write(str(len(words)) + '\n' + '\n'.join(words))
f.close()
