import java.io.*;
import java.util.*;

import edu.mit.jwi.Dictionary;
import edu.mit.jwi.IDictionary;
import edu.mit.jwi.item.*;

/**
 * Simple poetry generator based on Flowerewolf.
 * 
 * See:
 * <a href="http://nodebox.net/code/index.php/Flowerewolf">Flowerewolf</a>,
 * <a href="http://wordnet.princeton.edu">Princeton WordNet</a>,
 * <a href="http://projects.csail.mit.edu/jwi/">MIT Java WordNet Interface</a>.
 * 
 * @author Sathish Gopalakrishnan
 */
public class UBCPoet {
    
    private final List<String> vocab;
    private final IDictionary dict;
    
    public UBCPoet(File vocabulary, File wordnet) throws IOException {
        vocab = new ArrayList<String>();
        InputStream in = new FileInputStream(vocabulary);
        BufferedReader reader = new BufferedReader(new InputStreamReader(in));
        String line;
        while ((line = reader.readLine()) != null) {
            vocab.add(line);
        }
        reader.close();
        
        dict = new Dictionary(wordnet);
        dict.open();
    }

    public List<String> hyponyms(String noun) {
        IWordID id = dict.getIndexWord(noun, POS.NOUN).getWordIDs().get(0);
        ISynset synset = dict.getWord(id).getSynset();
        List<ISynsetID> hyponyms = synset.getRelatedSynsets(Pointer.HYPONYM);
        List<String> results = new ArrayList<String>();
        for (ISynsetID synsetId : hyponyms) {
            for (IWord word : dict.getSynset(synsetId).getWords()) {
                results.add(word.getLemma());
            }
        }
        return results;
    }

    public List<String> hypernyms(String noun) {
        IWordID id = dict.getIndexWord(noun, POS.NOUN).getWordIDs().get(0);
        ISynset synset = dict.getWord(id).getSynset();
        List<ISynsetID> hyponyms = synset.getRelatedSynsets(Pointer.HYPERNYM);
        List<String> results = new ArrayList<String>();
        for (ISynsetID synsetId : hyponyms) {
            for (IWord word : dict.getSynset(synsetId).getWords()) {
                results.add(word.getLemma());
            }
        }
        return results;
    }

    public String verse(String noun) {
        IWordID id = dict.getIndexWord(noun, POS.NOUN).getWordIDs().get(0);
        ISynset synset = dict.getWord(id).getSynset();
        List<String> words = new ArrayList<String>();
        for (String word : synset.getGloss().split("\\W+")) {
            if (sense(word, POS.NOUN)) {
                words.add(eloquent(word));
            } else {
                words.add(word);
            }
        }
        StringBuilder result = new StringBuilder();
        for (int ii = 0; ii < words.size(); ii++) {
            result.append(words.get(ii));
            if (ii % 4 == 0) {
                result.append("\n");
            } else {
                result.append(" ");
            }
        }
        return result.toString().replaceAll("_", " ").trim();
    }

    public boolean sense(String word, POS pos) {
        return dict.getIndexWord(word, pos) != null;
    }

    public String eloquent(String noun) {
        String hyp = pick(hyponyms(noun));
        if (hyp == null) {
            hyp = pick(hypernyms(noun));
        }
        if (hyp == null) {
            hyp = noun;
        }
        String adjective = alliterate(hyp, POS.NOUN);
        if (adjective == null) {
            return hyp;
        }
        return adjective + " " + hyp;
    }

    private String alliterate(String word, POS pos) {
        List<String> alliterations = alliterations(word);
        if (pos == POS.NOUN) {
            return pick(only(alliterations, POS.ADJECTIVE));
        }
        return pick(alliterations);
    }

    private List<String> only(List<String> words, POS pos) {
        List<String> result = new ArrayList<String>();
        for (String word : words) {
            if (sense(word, pos)) {
                result.add(word);
            }
        }
        return result;
    }

    private List<String> alliterations(String word) {
        String head = word.substring(0, 2);
        String foot = word.substring(word.length()-1);
        List<String> result = new ArrayList<String>();
        for (String other : vocab) {
            if (other.startsWith(head) && other.endsWith(foot)) {
                result.add(other);
            }
        }
        return result;
    }

    private <T> T pick(List<T> items) {
        if (items.isEmpty()) {
            return null;
        }
        return items.get((int)(Math.random() * items.size()));
    }
}