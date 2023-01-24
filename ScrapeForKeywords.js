// Meant to be run in console
// Line 22 contains what needs to be true to output program

var cursor = cursor || "";
var numChecked = 100;
async function check() {
    var programs = await (await fetch("https://www.khanacademy.org/api/internal/graphql/hotlist", {
      "body": `{\"operationName\":\"hotlist\",\"query\":\"query hotlist($curationNodeId: String, $onlyOfficialProjectSpinoffs: Boolean!, $sort: ListProgramSortOrder, $pageInfo: ListProgramsPageInfo) {\\n  listTopPrograms(curationNodeId: $curationNodeId, onlyOfficialProjectSpinoffs: $onlyOfficialProjectSpinoffs, sort: $sort, pageInfo: $pageInfo) {\\n    complete\\n    cursor\\n    programs {\\n      id\\n      key\\n      authorKaid\\n      authorNickname\\n      displayableSpinoffCount\\n      imagePath\\n      sumVotesIncremented\\n      translatedTitle: title\\n      url\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\",\"variables\":{\"curationNodeId\":\"xffde7c31\",\"onlyOfficialProjectSpinoffs\":false,\"sort\":\"UPVOTE\",\"pageInfo\":{\"itemsPerPage\":100,\"cursor\":\"${cursor}\"}}}`,
      "mode": "cors",
      "method": "POST",
      "credentials": "omit"
    })).json();
    cursor = programs.data.listTopPrograms.cursor;
    programs.data.listTopPrograms.programs.forEach(async p => {
        var program = await (await fetch("https://www.khanacademy.org/api/internal/graphql/programQuery", {
          "body": `{\"operationName\":\"programQuery\",\"query\":\"query programQuery($programId: String!) {\\n  programById(id: $programId) {\\n    byChild\\n    category\\n    created\\n    creatorProfile: author {\\n      id\\n      nickname\\n      profileRoot\\n      profile {\\n        accessLevel\\n        __typename\\n      }\\n      __typename\\n    }\\n    deleted\\n    description\\n    spinoffCount: displayableSpinoffCount\\n    docsUrlPath\\n    flags\\n    flaggedBy: flaggedByKaids\\n    flaggedByUser: isFlaggedByCurrentUser\\n    height\\n    hideFromHotlist\\n    id\\n    imagePath\\n    isProjectOrFork: originIsProject\\n    isOwner\\n    kaid: authorKaid\\n    key\\n    newUrlPath\\n    originScratchpad: originProgram {\\n      deleted\\n      translatedTitle\\n      url\\n      __typename\\n    }\\n    restrictPosting\\n    revision: latestRevision {\\n      id\\n      code\\n      configVersion\\n      created\\n      editorType\\n      folds\\n      __typename\\n    }\\n    slug\\n    sumVotesIncremented\\n    title\\n    topic: parentCurationNode {\\n      id\\n      nodeSlug: slug\\n      relativeUrl\\n      slug\\n      translatedTitle\\n      __typename\\n    }\\n    translatedTitle\\n    url\\n    userAuthoredContentType\\n    upVoted\\n    width\\n    __typename\\n  }\\n}\\n\",\"variables\":{\"programId\":\"${p.id}\"}}`,
          "method": "POST",
          "mode": "cors",
          "credentials": "omit"
        })).json();
        var code = program.data.programById.revision.code;
        if (code.toLowerCase().includes("blood")) {
            console.log("Blood on " + p.translatedTitle + " | " + p.id);
        }
        numChecked++;
    });
}

//Not the best method but hey it works lol (unless a fetch fails or smth but eh I threw this together)
setInterval(()=>{
    if (numChecked > 99) {
        numChecked = 0;
        check();
    }
}, 1000)
