import json
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


def get_user_data():
    f = open('userdata/users.json')
    data = json.load(f)
    time = []
    time_media = []
    time_multiplechoice = []
    rightAnswerNum = []
    rightAnswerNum_media = []
    rightAnswerNum_multiplechoice = []
    user_names = []
    for user in data:
        time_taken = []
        time_taken_multiplechoice = []
        time_taken_media = []
        right_number = []
        right_number_multiplechoice = []
        right_number_media = []
        user_names.append(user["name"])
        for entry in user["Quizdata"]["MultipleChoice"]["data"]:
            time_taken.append(entry["timeTaken"])
            time_taken_multiplechoice.append(entry["timeTaken"])
            right_number.append(entry["rightAnswers"])
            right_number_multiplechoice.append(entry["rightAnswers"])
        for entry in user["Quizdata"]["AudioQuiz"]["data"]:
            time_taken.append(entry["timeTaken"])
            time_taken_media.append(entry["timeTaken"])
            right_number.append(entry["rightAnswers"])
            right_number_media.append(entry["rightAnswers"])
        for entry in user["Quizdata"]["VideoQuiz"]["data"]:
            time_taken.append(entry["timeTaken"])
            time_taken_media.append(entry["timeTaken"])
            right_number.append(entry["rightAnswers"])
            right_number_media.append(entry["rightAnswers"])
        time.append(sum(time_taken) / len(time_taken))
        time_multiplechoice.append(
            sum(time_taken_multiplechoice) / len(time_taken_multiplechoice))
        time_media.append(sum(time_taken_media) / len(time_taken_media))
        rightAnswerNum.append(sum(right_number) / len(right_number))
        rightAnswerNum_multiplechoice.append(
            sum(right_number_multiplechoice) /
            len(right_number_multiplechoice))
        rightAnswerNum_media.append(
            sum(right_number_media) / len(right_number_media))
    return time, rightAnswerNum, time_multiplechoice, rightAnswerNum_multiplechoice, time_media, rightAnswerNum_media, user_names


#print(i["timeTaken"])
if __name__ == "__main__":
    timeTaken, rightNum, timeTakenMultiplechoice, rightNumMultiplechoice, timeTakenMedia, rightNumMedia, userNames = get_user_data(
    )
    data = list(zip(timeTaken, rightNum))
    dataMultiplechoice = list(
        zip(timeTakenMultiplechoice, rightNumMultiplechoice))
    dataMedia = list(zip(timeTakenMedia, rightNumMedia))
    clusterNum = 2
    kmeans = KMeans(n_clusters=clusterNum)
    kmeans.fit(data)
    kmeansMultiplechoice = KMeans(n_clusters=clusterNum)
    kmeansMultiplechoice.fit(dataMultiplechoice)
    kmeansMedia = KMeans(n_clusters=clusterNum)
    kmeansMedia.fit(dataMedia)

    plt.scatter(timeTakenMedia, rightNumMedia, c=kmeansMedia.labels_)
    for i in range(len(timeTakenMedia)):
        plt.annotate(userNames[i], (timeTakenMedia[i], rightNumMedia[i]))
    plt.title(f'User data clustering (cluster num={clusterNum})')
    plt.xlabel('Average time taken for media questions')
    plt.ylabel('Average number of right media questions')
    plt.savefig('../frontend/public/assets/clusteringMedia.jpg')
    plt.show()

    plt.scatter(timeTakenMultiplechoice,
                rightNumMultiplechoice,
                c=kmeansMultiplechoice.labels_)
    for i in range(len(timeTakenMultiplechoice)):
        plt.annotate(userNames[i],
                     (timeTakenMultiplechoice[i], rightNumMultiplechoice[i]))
    plt.title(f'User data clustering (cluster num={clusterNum})')
    plt.xlabel('Average time taken for multiple choice questions')
    plt.ylabel('Average number of right multiple choice questions')
    plt.savefig('../frontend/public/assets/clusteringMultiplechoice.jpg')
    plt.show()

    plt.scatter(timeTaken, rightNum, c=kmeans.labels_)
    for i in range(len(timeTaken)):
        plt.annotate(userNames[i], (timeTaken[i], rightNum[i]))
    plt.title(f'User data clustering (cluster num={clusterNum})')
    plt.xlabel('Average time taken for all questions')
    plt.ylabel('Average number of right questions')
    plt.savefig('../frontend/public/assets/clustering.jpg')
    plt.show()

