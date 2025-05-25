function totalMojosConsumed(initialMojos) {
  let mojosEaten = initialMojos;
  let mutkis = initialMojos;

  while (mutkis >= 3) {       //jotokkon amar kace 3 ta ba beshi mojo take ai loop totokkonoi calabo
    let newMojos = Math.floor(mutkis / 3);   // 3tar muktir binimoye 1 ta mojo exchange korbo
    mojosEaten += newMojos;   // noton jei mojo pailam oita mojoeasten ar sate add korlam
    mutkis = (mutkis % 3) + newMojos; //exchange er por je mutki obosisto thakbe, oitar sate noton pawa mojo sonka add korbo(karon protita mojor sate akta kore mutki pabo)
  }

  return {
    totalMojo: mojosEaten,
    remain_mukti : mutkis
  };
}

const initial = 20;
console.log("Total Mojos consumed:", totalMojosConsumed(initial));
