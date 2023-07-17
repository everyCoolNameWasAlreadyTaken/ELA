import json
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt


def get_user_data():
    f = open('userdata/users.json')
    data = json.load(f)
    print(data)
    time = []
    rightAnswerNum = []
    for user in data:
        time_taken = []
        right_number = []
        for entry in user["Quizdata"]["MultipleChoice"]:
            time_taken.append(entry["timeTaken"])
            right_number.append(entry["rightAnswers"])
        time.append(sum(time_taken) / len(time_taken))
        rightAnswerNum.append(sum(right_number) / len(right_number))
    return time, rightAnswerNum


#print(i["timeTaken"])
if __name__ == "__main__":
    timeTaken, rightNum = get_user_data()
    data = list(zip(timeTaken, rightNum))
    clusterNum = 2
    kmeans = KMeans(n_clusters=clusterNum)
    kmeans.fit(data)

    plt.scatter(timeTaken, rightNum, c=kmeans.labels_)
    plt.title(f'User data clustering (cluster num={clusterNum})')
    plt.xlabel('Average time taken for multiple choice questions')
    plt.ylabel('Average number of right questions')
    plt.show()
